# Hypermantis

![hypermantis text with bg](https://github.com/user-attachments/assets/52c34906-7928-4838-8f83-f6596c0e60ef)
![](https://img.shields.io/github/stars/juanpurpp/Hypermantis) ![](https://img.shields.io/github/forks/juanpurpp/Hypermantis) ![](https://img.shields.io/github/tag/juanpurpp/Hypermantis) ![](https://img.shields.io/github/release/juanpurpp/Hypermantis) ![](https://img.shields.io/github/issues/juanpurpp/Hypermantis)


**Table of Contents**

[TOC]

# About the project
Hypermantis is a opensource project dedicated to analyze hyperspectral images in order to visualize this type of files in a more fast, comfortable and dynamic way. We tried creating Hypermantis as a desktop application, integrating Python to a NodeJS and Electron project, so that we have a free app with Windows, MacOS and Linux distributions.

Hypermantis doesn't have any intention of profiting from the product. In fact, it aims to do the opposite, encouring to everyone to feel free to participate and colaborate in this open source project.
## Technologies used
The project is built with NodeJS essentially, the framework used are Electron and React. The reasons of this is just because we wanted to create a simple application that could be distributed to almost every enviroment. The project also uses tailwind for styling the frontend.

The hyperspectral image proccesing use a python server that communicates with the frontend in HTTP querys.

So basically the application is a react running as a desktop service communicating and exchanging information with a python service that will translate the hyperspectral image file to useful information for the user.
## Functioning
The application objective is to be a simple way to analyze hyperspectral images, so if you think that we can improve that point you can give us feedback.

In the application the user can select or drag a .bil file, this file will be proccesed and finally the application will show the information and a simple image visualization.
### Plugins
One of the project objectives is to work with plugins, letting the user install official or third party modules to the application.

Originally this project was created for combine artificial intelligence and hyperspectral images, so that is why this application is focused to work with a modular architecture.

This plugins are in fact just javascript functions that can use application events and instances.
## Colaborating
The heart of the opensourcing is to colaborate and create communities, so if you can and want colaborate and contribuite with some of your work to this project you will be absolutely welcome.

We actually accept a lot of types of work, it goes from translating the application to add features in the development part. In that cases you can create pull requests and the responsible team will check your work.
