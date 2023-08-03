package com.chupryna.anime.repositories;

import com.chupryna.anime.entity.Studio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudioRepository extends MongoRepository<Studio, String> {

}
