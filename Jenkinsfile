pipeline {
  agent any
 
  stages {
    stage('Clone repository') { 
            steps { 
                script{
                   retry(count: 3) {
                      checkout scm
                   }
                }
            }
        }
    
     stage('Npm stage') { 
            steps { 
                echo 'Npm stage'
                sh 'npm install'
                sh 'npm audit fix'
                sh 'CI=false npm run build'
            }
        }
   
     
    stage('Docker Build Image') {
      steps {
        echo 'Image'
          script{
                 sh 'docker build -t eiereact .'
                }
        
      }
    }
    stage('Push To ECR') {
      steps {
        script{
          retry(count: 3) {
            withAWS(credentials: 'aws') {
             //sh 'aws iam get-user'
              sh 'aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws/i4f7p8k7'
              sh 'docker tag eiereact:latest public.ecr.aws/i4f7p8k7/eiereact:latest'
              sh 'docker push public.ecr.aws/i4f7p8k7/eiereact:latest'
            
            }      
          }
          
        }
      }
    }
     stage('Remove Local Docker Image') {
      steps {
        echo 'Remove Local Docker Image'
          script{
                 sh 'docker rmi eiereact'
                 sh 'docker rmi public.ecr.aws/i4f7p8k7/eiereact:latest'
                }
        
      }
    }
     stage('SSH to AWS EC2') {
      steps {
        echo 'SSH'
        retry(count: 3) {
          sshagent(credentials:['ssh']){
            sh '''
               set -ev
               ssh -o StrictHostKeyChecking=no -l ec2-user ec2-13-113-55-21.ap-northeast-1.compute.amazonaws.com << EOF
               docker rm $(docker stop $(docker ps -a -q --filter ancestor=public.ecr.aws/i4f7p8k7/eiereact --format="{{.ID}}"))
               docker rmi public.ecr.aws/i4f7p8k7/eiereact
               docker pull public.ecr.aws/i4f7p8k7/eiereact:latest
               docker run -t -i -d -p 3000:3000 public.ecr.aws/i4f7p8k7/eiereact:latest
               exit
            '''

          }
        }
        
        
      }
    }
    
    
    
  }
  
  post {
    always {
      echo 'Hello World'
    }
  }
}
