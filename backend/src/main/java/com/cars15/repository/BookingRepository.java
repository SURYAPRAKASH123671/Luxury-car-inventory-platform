package com.cars15.repository;

import com.cars15.domain.AppUser;
import com.cars15.domain.TestDriveBooking;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<TestDriveBooking, Long> {
    List<TestDriveBooking> findByUserOrderByCreatedAtDesc(AppUser user);
    List<TestDriveBooking> findAllByOrderByCreatedAtDesc();
}
