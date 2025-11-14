package com.klef.dev.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.dev.entity.Hostel;
import com.klef.dev.repository.HostelRepository;

@Service
public class HostelServiceImpl implements HostelService {

    @Autowired
    private HostelRepository hostelRepository;

    @Override
    public Hostel addHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    @Override
    public List<Hostel> getAllHostels() {
        return hostelRepository.findAll();
    }

    @Override
    public Hostel getHostelById(int id) {
        Optional<Hostel> opt = hostelRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public Hostel updateHostel(Hostel hostel) {
        return hostelRepository.save(hostel);
    }

    @Override
    public void deleteHostelById(int id) {
        hostelRepository.deleteById(id);
    }
}
