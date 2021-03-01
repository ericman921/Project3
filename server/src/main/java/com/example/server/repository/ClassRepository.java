package com.example.server.repository;

import com.example.server.model.Classes;
import org.springframework.data.repository.CrudRepository;

public interface ClassRepository extends CrudRepository<Classes, Long> {
}
