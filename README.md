# learning-deskapp

## Overview
This app is for anyone who wants to learn English. Enter unfamiliar words every day to test to deepen the familiarity of the words. This app also records the user's learning trajectory to track the progress of daily learning.

## Screenshot
![image](https://github.com/JohnsonHuang555/LearningEnglish/blob/master/Screenshot.jpg)

## Client setup

### Install packages
```
yarn
```

### Build for production
```
yarn electron:build
```

### Compiles and hot-reloads for development
```
yarn electron:serve
```

## Server setup

### Install packages
```
cd server
yarn
```
### Database setting
Go to MongoDB to create database which name is `LearningAppDB`.
Establish two tables which name are `User` and `Vocabulary`.

### Launch server
```
yarn watch
```

### Advanced setting
You can set database detail setting in the `Dbsettings.js`.

## Powered by Electron + Vue + MongoDB + NodeJs
