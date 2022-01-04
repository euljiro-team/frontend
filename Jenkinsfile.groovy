node {
    stage("Parameter Check") {
        echo 'Start'
        echo "env.JOB_NAME - ${env.JOB_NAME}"
        echo "env.ref - ${env.ref}"
        echo "env.gitlabBranch - ${env.gitlabBranch}"
        echo "env.gitlabSourceBranch - ${env.gitlabSourceBranch}"
        echo "${params.GIT_BRANCH}"

        if (ref.contains('refs/heads/') ){
            git_branch = "${ref.replace("refs/heads/", "")}"
        }else if (env.gitlabBranch != null){
            git_branch = "${env.gitlabBranch.replace("origin/", "")}"
        }else{
            git_branch = "${GIT_BRANCH.replace("origin/", "")}"
        }
        echo "build with this branch : ${git_branch}"
    }
    stage ('Clone'){
        git branch: "${git_branch}", credentialsId: 'jenkins_token', url: 'https://github.com/minssan9/voyagerss_vuejs.git'
    }

    stage("Build Docker Image") {
        sh "docker build -t ${env.JOB_NAME}_${git_branch}:${BUILD_NUMBER} ."
//        sh "docker build -t voyagerss_vuejs_develop ."
    }

//    stage("Build Docker Image") {
//        sh "docker push ${env.JOB_NAME}_${git_branch}:${BUILD_NUMBER}"
//    }

    stage('deploy in develop env') {
        if (git_branch == "develop") {
            try {

//                sh "docker pull ${env.JOB_NAME}_${git_branch}:${BUILD_NUMBER}"
//                sh "docker pull voyagerss_vuejs_develop"

                sh "docker rm -f ${env.JOB_NAME}_${git_branch}"
                sh "docker run  -it -d -p 80:80 -p 443:443 -v /mnt/c/logs:/var/log/nginx -h ${env.JOB_NAME} --name ${env.JOB_NAME}_${git_branch} ${env.JOB_NAME}_${git_branch}:${BUILD_NUMBER}"
//                docker run --name voyagerss_vuejs_develop -it -d -p 80:80 -p 443:443 -v /mnt/c/logs:/var/log/nginx -h voyagerss_vuejs voyagerss_vuejs_develop
            } catch (e) {
                sh 'echo develop deploy Fail!!'
            }
        }
    }

    stage('deploy in release env') {
        if (git_branch == "release") {
            sh 'docker tag nodejs:latest 293001004573.dkr.ecr.ap-northeast-2.amazonaws.com/voyagerss_vuejs:latest'

            withAWS(role: 'voyagerss', roleAccount: '293001004573', externalId:'externalId') {
                sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 293001004573.dkr.ecr.ap-northeast-2.amazonaws.com/voyagerss_vuejs'
                sh 'docker push 293001004573.dkr.ecr.ap-northeast-2.amazonaws.com/voyagerss_vuejs:latest'
            }

            withAWS(region:'ap-northeast-2', credentials:'jenkinsaws') {
                sh """
                  aws ecs update-service \
                    --region ap-northeast-2 \
                    --cluster ${env.JOB_NAME} \
                    --service ${env.JOB_NAME} \
                    --force-new-deployment \
                    --desired-count 241
                  aws ecs wait services-stable \
                    --cluster ${env.JOB_NAME} \
                    --services ${env.JOB_NAME}D
                """
            }
        }
    }
}
