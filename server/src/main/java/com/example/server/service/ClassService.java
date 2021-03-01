package com.example.server.service;

import com.example.server.model.Classes;
import org.springframework.http.HttpStatus;

public interface ClassService {
    Iterable<Classes> getClasses();
    Classes createClass(Classes classes);
    Classes updateClass(Classes classes);
    HttpStatus deleteClass(Long id);
}
