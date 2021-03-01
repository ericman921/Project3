package com.example.server.service;

import com.example.server.model.Classes;
import com.example.server.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ClassServiceImpl implements ClassService {

    @Autowired
    ClassRepository classRepository;

    @Override
    public Iterable<Classes> getClasses() {
        return classRepository.findAll();
    }

    @Override
    public Classes createClass(Classes classes) {
        return classRepository.save(classes);
    }

    @Override
    public Classes updateClass(Classes classes) {
        return classRepository.save(classes);
    }

    @Override
    public HttpStatus deleteClass(Long id) {
        classRepository.deleteById(id);
        return HttpStatus.OK;
    }
}
