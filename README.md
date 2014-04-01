sample-hapi-rest-api
====================

A sample structure for building a REST API on top of hapi.js framework.

Start by cloning this repo and going inside the project's folder:

```
git clone git@github.com:agendor/sample-hapi-rest-api.git
cd sample-hapi-rest-api
```

##Setting-up basic configuration

To begin with, we have to define some environment variables (with an Ubuntu 12.04 you can edit the `~/.bashrc` file):

```
export NODE_ENV=development
export NODE_HOST=localhost
export NODE_PORT=8000
export DB_DEV_USER=root
export DB_DEV_PASS=rootpass
```

**PS**: Don't forget to alter `DB_DEV_USER` AND `DB_DEV_PASS` values properly to access your MySQL Database.

Then you have to give permission to the script `database.sh`:

```
chmod +x database.sh
```

After giving permission, you can run it. It's going to drop and then re-create a MySQL Database called **hapi-todo** with `user` and `task` tables and insert a default user, whcih credentials are:

* Email: user1@customer1.com
* Pass: 123

So run it:

```
bash database.sh
```

Database setup. So it's time to install project dependencies, run the following command:

```
npm install
```


Now you can check the recently created database in you MySQL. Start the server by running `grunt` in the terminal:

```
grunt
```

All the unit tests will run and everything should be green.

That's it! You should be able to play around your API GETting, POSTing, PUTing AND DELETEing Tasks. The end-points are as described in the `src/routes/task.js` file:

* **GET** http://localhost:8000/tasks/{task_id}
* **GET** http://localhost:8000/tasks
* **POST** http://localhost:8000/tasks
* **PUT** http://localhost:8000/tasks/{task_id}
* **DELETE** http://localhost:8000/tasks/{task_id}