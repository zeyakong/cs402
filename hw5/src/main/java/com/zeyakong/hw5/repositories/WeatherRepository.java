package com.zeyakong.hw5.repositories;

import com.zeyakong.hw5.models.Weather;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WeatherRepository extends MongoRepository<Weather, String> {
    Weather findByLanAndLon(String lan,String lon);
}
