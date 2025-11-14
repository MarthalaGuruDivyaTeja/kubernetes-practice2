package com.klef.dev.service;

import java.util.List;
import com.klef.dev.entity.Hostel;

public interface HostelService {
    Hostel addHostel(Hostel hostel);
    List<Hostel> getAllHostels();
    Hostel getHostelById(int id);
    Hostel updateHostel(Hostel hostel);
    void deleteHostelById(int id);
}
