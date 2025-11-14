package com.klef.dev.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.klef.dev.entity.Hostel;

@Repository
public interface HostelRepository extends JpaRepository<Hostel, Integer> 
{
    Hostel findByEmail(String email);
    Hostel findByWardenContact(String wardenContact);
}
