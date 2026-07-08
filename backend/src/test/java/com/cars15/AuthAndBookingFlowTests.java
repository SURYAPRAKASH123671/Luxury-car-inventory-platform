package com.cars15;

import com.cars15.dto.ApiDtos.*;
import java.time.LocalDate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthAndBookingFlowTests {
    @Autowired
    MockMvc mockMvc;

    @Test
    void loginReturnsJwtForSeededBuyer() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"buyer@cars15.local","password":"buyer123"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", not(emptyString())))
                .andExpect(jsonPath("$.user.role").value("USER"));
    }

    @Test
    void canCreatePublicBooking() throws Exception {
        mockMvc.perform(post("/api/bookings")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "carId": "1",
                                  "name": "Demo Buyer",
                                  "phone": "+91 90000 12345",
                                  "preferredDate": "2026-07-20"
                                }
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.carId").value("1"))
                .andExpect(jsonPath("$.status").value("REQUESTED"));
    }
}
