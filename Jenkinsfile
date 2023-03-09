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
     stage('Copy important config to directory'){
      steps {
        echo 'Copy file'
        configFileProvider(
            [configFile(fileId: 'firebase', variable: 'Config')]) {
             // some block
              
   
              sh "mkdir -p src/config"
              sh "touch src/config/firebase.js"
              sh "cp ${env.Config} src/config/firebase.js"
              
             
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
              docker stop frontend || true
              docker rm frontend || true
              docker rmi -f public.ecr.aws/i4f7p8k7/eiereact || true
              docker pull public.ecr.aws/i4f7p8k7/eiereact:latest
              docker run -t -i -d -p  3000:3000 --name="frontend" public.ecr.aws/i4f7p8k7/eiereact:latest
              exit
            '''
            /*
            sh '''
               set -ev
               ssh -o StrictHostKeyChecking=no -l ec2-user ec2-13-113-55-21.ap-northeast-1.compute.amazonaws.com << EOF
               docker rm $(docker stop $(docker ps -a -q --filter "expose=3000"))
               docker rmi public.ecr.aws/i4f7p8k7/eiereact -f
               docker pull public.ecr.aws/i4f7p8k7/eiereact:latest
               docker run -t -i -d -p 3000:3000 public.ecr.aws/i4f7p8k7/eiereact:latest
               exit
            '''*/
            //docker rm $(docker stop $(docker ps -a -q --filter ancestor=public.ecr.aws/i4f7p8k7/eiereact --format="{{.ID}}"))
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
