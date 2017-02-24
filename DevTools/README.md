# The developer tools handy for AMIS

## https-here
This is a python script used to expose any directory on your local computer over ssl at https://localhost. To use it you will need to have python 2.7 installed.

Once you have python installed, download the https-here script onto your local machine and open a terminal in the directory you downloaded it into. Then execute the following lines in your terminal and give your superuser password when prompted:

```
$ sudo chmod a+x https-here
$ sudo cp https-here /usr/local/bin
```

Now you can go into any directory on your machine and type

```
$ sudo https-here 
```

now go to https://localhost in your browser and you will see the contents of the directory you exposed. Please note that you can only expose one directory at a time, because the script reserves the port 443 on yor machine.

To exit the process go back to the terminal where the script is running and do ctrl+c