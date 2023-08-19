# Web service overview
Our goal is to provide a platform that can explain malware, specifically, to output the malicious behavior chains of malware to explain how malware executes and performs malicious behaviors.

![image](https://github.com/X-MalChain/projects/assets/141179257/3526469e-1526-4702-8df1-aea4716c4620)

## Specification
Firstly, users need to upload the apk files of malware. Users can either drag files directly into the upload box or select local files, as shown in the following figure.

<img width="1440" alt="image" src="https://github.com/X-MalChain/projects/assets/141179257/c39c9295-e09b-44d5-b449-26fb8e21ace6">

Afterwards, X-MalChain will analyze the given malware and output its basic information as well as some critical features (i.e., permissions and APIs) that are typically used to accomplish harmful behaviors. Most importantly, X-MalChain will detect sensitive behaviors and generate malicious behavior chains to interpret malware. Finally, the user will obtain a brief but clear description to understand why this application is judged to be malware.

<img width="1420" alt="image" src="https://github.com/X-MalChain/projects/assets/141179257/1d489798-d311-4c3f-b267-c390e02a3266">


## Project setup
Note that, \color{red}{our website is being publicly deployed} (due to server and domain name considerations). Prior to this, you can deploy the project to your local machine using the following commands:
### Install
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
