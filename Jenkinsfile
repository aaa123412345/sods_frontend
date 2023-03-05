pipeline {
  agent {
    docker{
        image 'node:17-alpine'
        args '-p 3000:3000'
    }
  }
  environment {
      CI = 'true'
  }
 
  stages {
    stage('Clone repository') { 
            steps { 
                script{
                checkout scm
                }
            }
        }
    
     stage('Npm stage') { 
            steps { 
                echo 'Npm stage'
                sh 'npm install --force'
               // sh 'npm run build'
            }
        }
   /*
     
    stage('Docker Build Image') {
      steps {
        echo 'Image'
          script{
                 sh 'docker build -t backenddocker .'
                }
        
      }
    }
    stage('Push To ECR') {
      steps {
        script{
          withAWS(credentials: 'aws') {
             //sh 'aws iam get-user'
            sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/i4f7p8k7'
            sh 'docker tag backenddocker:latest public.ecr.aws/i4f7p8k7/backenddocker:latest'
            sh 'docker push public.ecr.aws/i4f7p8k7/backenddocker:latest'
            
          }
        }
      }
    }
     stage('SSH to AWS EC2') {
      steps {
        echo 'SSH'
        sshagent(credentials:['ssh']){
          sh '''
             set -ev
             ssh -o StrictHostKeyChecking=no -l ec2-user ec2-13-113-55-21.ap-northeast-1.compute.amazonaws.com << EOF
             docker rm $(docker stop $(docker ps -a -q --filter ancestor=public.ecr.aws/i4f7p8k7/backenddocker --format="{{.ID}}"))
             docker pull public.ecr.aws/i4f7p8k7/backenddocker:latest
             docker run -t -i -d -p 8888:8888 public.ecr.aws/i4f7p8k7/backenddocker:latest
             exit
          '''
       
        }
        
        
      }
    }*/
    
    
    
  }
  
  post {
    always {
      echo 'Hello World'
    }
  }
}
