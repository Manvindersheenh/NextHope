
create database nexthope;
use nexthope;

create table users(emailid varchar(100) primary key, pwd varchar(30) COLLATE utf8_bin, utype varchar(60),dos date,status int);
select * from users;

create table volkyc(emailid varchar(50) primary key, name varchar(30),contact varchar(12),address varchar(50),city varchar(20),gender varchar(10),dob date,quali varchar(30), occu varchar(50),info varchar(200),picpath varchar(500),idpath varchar(500));
select * from volkyc;
create table clprof(email varchar(50) primary key,name varchar(30),business varchar(200),bprofile varchar(200),address varchar(100),city varchar(20),contact varchar(12),idproof varchar (40),idno varchar(50),info varchar(50));
select * from clprof;
create table jobs(jobid int primary key auto_increment,cid varchar(50),jobtitle varchar(50),jobtype varchar(50),address varchar(100),city varchar(50),edu varchar(50),contact varchar(20));
 select * from jobs;
 
