# ZAMBIA NET PAY 

Built a simple Zambia net pay with Rails Web app. The purpose tool that can be used to calculate the monthly take home (net) pay for employees (except part time employees) working in Zambia. All formulae are based on the 2017 NAPSA Ceiling, Income Tax Act and Statutory instruments as amended by the provisions of the 2017 Zambian National Budget. The tool is to be used as a guide only, Errors and Omissions expected.

## Key Features

* Calculate the monthly take home (net) pay for employee (except part time employees) working in Zambia.

## Quick Installation Guide

For deployment we use Rails 7  Server (rails s). On the localhost. This will help you have some knowledge of running a rails site and Backend.


```
git clone https://github.com/DavidTheProgrammer/zambia-net-pay

```
`cd zambia-net-pay`

### Start the backend application

To build backend run:
Update Gemfile

# Postgres Database

Remove sqlite

`gem 'sqlite3'`

Added Postgressql Database

`gem "pg", "~> 1.1"`

Run the application
`bundle install`                             |
# Localhost

`rails server(rails s)`

At this point the backend service should be up and running at:
`http://127.0.0.1:3000`


| Parameter     | Type        |  Description Localhost and Port  
| ------------- | ------------ -----------------------------------------|
| `Home Page`   | string      | `http://127.0.0.1:3000`                 |
# Herokuapp

At this point the backend service and the rails application should be up and running:
`https://stark-headland-84744.herokua.com`

| Parameter | Type            |  Description - Heroku
| ----------| -------------    ----------------------------------------------- |
|`Home Page`| string          | `https://stark-headland-84744.herokua.com`     |

# Todo for Event Planner 

```
* Authentication - Create Users Authentication 
* Login - For the Users
* Dashboard - For the Users Authenticated
* Test - Write Test for Rails Web application
```
