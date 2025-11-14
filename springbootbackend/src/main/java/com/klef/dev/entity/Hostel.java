package com.klef.dev.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "hostel_table")
public class Hostel {
    
    @Id
    @Column(name = "hostel_id")
    private int id;
    
    @Column(name = "hostel_name", nullable = false, length = 100)
    private String name;
    
    @Column(name = "hostel_location", nullable = false, length = 100)
    private String location;
    
    @Column(name = "hostel_type", nullable = false, length = 20)
    private String type; // BOYS or GIRLS
    
    @Column(name = "hostel_capacity", nullable = false)
    private int capacity;
    
    @Column(name = "hostel_warden", nullable = false, length = 50)
    private String wardenName;
    
    @Column(name = "warden_contact", nullable = false, unique = true, length = 20)
    private String wardenContact;
    
    @Column(name = "hostel_email", nullable = false, unique = true, length = 50)
    private String email;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }
    public void setLocation(String location) {
        this.location = location;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getWardenName() {
        return wardenName;
    }
    public void setWardenName(String wardenName) {
        this.wardenName = wardenName;
    }

    public String getWardenContact() {
        return wardenContact;
    }
    public void setWardenContact(String wardenContact) {
        this.wardenContact = wardenContact;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Hostel [id=" + id + ", name=" + name + ", location=" + location + ", type=" + type 
                + ", capacity=" + capacity + ", wardenName=" + wardenName + ", wardenContact=" 
                + wardenContact + ", email=" + email + "]";
    }
}
