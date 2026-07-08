package com.cars15.repository;

import com.cars15.domain.AppUser;
import com.cars15.domain.PriceAlert;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PriceAlertRepository extends JpaRepository<PriceAlert, Long> {
    List<PriceAlert> findByUserOrderByCreatedAtDesc(AppUser user);
    List<PriceAlert> findAllByOrderByCreatedAtDesc();
}
