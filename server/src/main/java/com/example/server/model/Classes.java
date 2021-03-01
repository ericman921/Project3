package com.example.server.model;

import javax.persistence.*;

@Entity
@Table(name = "students_classes")
public class Classes {
    @Id
    @GeneratedValue
    @Column
    private Long id;

    @Column
    private String className;

    @Column
    private String classNumber;

    @OneToOne(mappedBy = "classes", cascade = {
            CascadeType.ALL
    })
    private Student student;

    public Classes() { }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassNumber() {
        return classNumber;
    }

    public void setClassNumber(String classNumber) {
        this.classNumber = classNumber;
    }
}
