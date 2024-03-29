# RecoMAX
![image](https://user-images.githubusercontent.com/41867381/122676871-d6d1fa00-d21a-11eb-90dd-80fd60cf8602.png)

The movie platform system supports a great multitude of movies, so it is not easy to choose which movie to watch. Using RecoMAX, you can see which movies other users with similar traits are most satisfied with or a list of movies that are similar to your favorite movies. RecoMAX will show a poster of recommended movies based on your traits or your favorite movie.

## Features

### User Based Recommender

RecoMax provides powerful user customized movie recommend system. This function is shown up as a default when you first access RecoMAX page. When you choose your gender, age, occupation, and genres, then you will receive up to 10 lists of movies that best match your taste.

![image](https://user-images.githubusercontent.com/41867381/122676915-01bc4e00-d21b-11eb-9534-d9038f9243f6.png)


### Movie Basaed Recommender

If you know the title of the movie that impressed you, RecoMAX recommends similar movies that you might like. You can access this function by clicking tab on the navigation bar. Enter the title of the movie and the number of movies to be recommended to create a recommendation lists.

![image](https://user-images.githubusercontent.com/41867381/122676938-17317800-d21b-11eb-846e-b0549ff321cb.png)


### Convenient User Interface for Option Selection

You can easily access two different kinds of recommender system just by clicking the tab menu. And the drop-down selection boxes make it easier for users to input various and reliable user inputs. In particular, the 'genre' option of a user based recommender can be conveniently entered in multiple numbers depending on your preference.

![image](https://user-images.githubusercontent.com/41867381/122676971-38926400-d21b-11eb-8657-b266f22b3056.png)


### Intuitive Poster Preview Display

The list of recommendations is provided with thumbnail of movie posters. If there is no movie poster data, the title is displayed as a thumbnail. The first page of RecoMAX shows the 40 best-rated films in the entire genre, action genre, drama genre, and animation genre.

![image](https://user-images.githubusercontent.com/41867381/122676990-4c3dca80-d21b-11eb-95d9-a30fd4f74eaf.png)


## Algorithm

### Recommend Top 10 movies given user data

The program calculates the average movie rating of users who are similar to you and recommends 10 movies in the highest order(These processes are executed in rankUserBasedRating method in RatingCalculator.class). The program first calculates the average movie rating for users whose gender, age, and occupation all match with yours. If the list of movies does not reach 10, the program fills the rest of the list with the average movie ratings of users who match only two of them: gender, age, or occupation. If still don't have 10 movies, the program fills the rest of the list with the average movie ratings of users who match only one of their gender, age, or occupation. If it is not possible to create 10 movie lists from users similar to you, a movie list is created based on the average movie rating of all users(These processes are executed in searchSimilarUser method in UserList.class).<br/>

### Recommend movies given a movie title

The program calculates the average movie rating of similar movies and recommends movies in the highest order(These processes are executed in rankGenreBasedRating method in RatingCalculator.class). The program only uses data from users who rated a given movie above the average rating of each user(These processes are executed in searchFavoriteUsers method in UserList.class). And movies that match the genre of the given movie are recommended. Similar to recommending movies based on given user data, if the limit is not met, the number of matching genres is reduced by 1(These processes are executed in searchSimilarID method in MovieList.class).

### Cache-based database

If the number of calculation to perform both algorithms above, the loading time may be inefficiently increased. In particular, the list of 40 movies displayed on the main page is frequently called, but the computation speed is slow due to the small number of options to filter. To improve the performance of the service, we cached expected outcome values in the database in advance for certain frequently used and time consuming inputs. Cached data is managed by updating it every certain period of time or whenever a database is changed significantly.

## Building Docker Image

This program will be executed on the Ubuntu20:04. Building docker image, the docker file will install 'openjdk-11-jdk' and 'maven' on the Ubuntu. Then required files will be migrated to the docker container.

```sh
docker build -t cse364-ubuntu20.04/movie_recommender_os .
docker run -p 8080:8080 -it --name container cse364-ubuntu20.04/movie_recommender_os /bin/bash
```
It forward the port 8080 for your local machine.

---

## Getting Started
Once you enter in docker container, you can deploy the RECOMAX with tomcat.
You can do the process via executing 'war.sh' file. It sets a mongodb and execute 'catalina.sh'.

```sh
bash ./war.sh
```

Meanwhile, if you want to execute standalone spring web application with jar file, you can execute 'run.sh' file. It will clone this repository and build the application with mvn.
```sh
bash ./run.sh
```

Once you execute one of them, you can access the website through web browser in your local machine.
```sh
war.sh - http://localhost:8080/RECOMAX
run.sh - http://localhost:8080
```
---

## User Guide

Under the RecoMAX logo you can find User Based Recommender and Movie Based Recommender tabs, and click to use each function.

### **User-Based Recommend System**

This is the first page of a User Based Recommender.
![userbased_main](https://user-images.githubusercontent.com/80080164/122674945-38419b00-d212-11eb-999e-2ddcf3d18baf.PNG)
You can select your gender, age, occupation and your favorite movie genres. Please enter your age, and select your gender, occupation and genre through the drop down box. If you want to specify multiple genres, you can add them by clicking the "+" icon. If you specify gender, age, occupation, and genre and click the "Search" icon, you can see posters for the top 10 recommended movies based on your information. Gender, occupation, and genre can be selected from the following list.

**[gender]**

Female
Male

**[occupation]**

|      other      |   academic    |     educator      |     artist     |   clerical    |      admin       |    college    |  grad student  | customer service |  doctor   |
| :-------------: | :-----------: | :---------------: | :------------: | :-----------: | :--------------: | :-----------: | :------------: | :--------------: | :-------: |
| **health care** | **executive** |  **managerial**   |   **farmer**   | **homemaker** | **K-12 student** |  **lawyer**   | **programmer** |   **retired**    | **sales** |
|  **marketing**  | **scientist** | **self-employed** | **technician** | **engineer**  |  **tradesman**   | **craftsman** | **unemployed** |    **writer**    |

**[genres]**

|    Action     | Adventure  |  Animation  | Children's  |   Comedy    |   Crime    | Documentary  |  Drama  |   Fantasy   |
| :-----------: | :--------: | :---------: | :---------: | :---------: | :--------: | :----------: | :-----: | :---------: |
| **Film-Noir** | **Horror** | **Musical** | **Mystery** | **Romance** | **Sci-Fi** | **Thriller** | **War** | **Western** |

#### Example

The following is examples of a User Based Recommender.
![userbased_sample_example3](https://user-images.githubusercontent.com/80080164/122675354-f74a8600-d213-11eb-9cef-518d3f8baa72.PNG)
![userbased_sample_example2](https://user-images.githubusercontent.com/80080164/122675689-8c9a4a00-d215-11eb-93aa-59a5540ed9a1.PNG)

---

### **Movie Based Recommend System**

This is the first page of a Movie Based Recommender.
![moviebased_main](https://user-images.githubusercontent.com/80080164/122675529-d33b7480-d214-11eb-9deb-d252a3097fc1.PNG)
Please enter the title of your favorite movie and the number of movies you want to recommend. You can check the list of recommended movies by clicking the "Search" icon.<br/>

**Note for the title**
- Case-insensitive
- Spaces must be followed.
- Although the results are provided even if the year is not written, it is recommended to write the year with title for accurate results.
- No results are provided for invalid movie titles.

#### Example

The following is examples of a Movie Based Recommender.
![moviebased_sample_example2](https://user-images.githubusercontent.com/80080164/122675653-670d4080-d215-11eb-854a-e41ac130c9e5.PNG)
![moviebased_sample_example](https://user-images.githubusercontent.com/80080164/122675641-4f35bc80-d215-11eb-9447-d2424f55e4bc.PNG)

---

## Authors

- 김형규: developed movie-based REST controller and wrote test codes
- 문지헌: wrote README
- 차준형: developed user-based REST controller and refactored error handlers
- 홍다빈: developed movie-based recommend system algorithms
