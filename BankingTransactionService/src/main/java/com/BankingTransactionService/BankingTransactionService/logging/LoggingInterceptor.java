package com.BankingTransactionService.BankingTransactionService.logging;

import com.BankingTransactionService.BankingTransactionService.service.entityService.LogEntityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class LoggingInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(LoggingInterceptor.class);
    private final LogEntityService logEntityService;

    public LoggingInterceptor(LogEntityService logEntityService) {
        this.logEntityService = logEntityService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String logMessage = String.format("Incoming request data: URL=%s, Method=%s, Headers=%s, Params=%s",
                request.getRequestURL(),
                request.getMethod(),
                request.getHeaderNames(),
                request.getParameterMap());

        logEntityService.save(logMessage);

        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws IOException {

        String logMessage = String.format("Outgoing response data: Status=%s, Headers=%s,",
                response.getStatus(),
                response.getHeaderNames());

        if (ex != null) {
            logger.error("Exception occurred: ", ex);
        }

        logEntityService.save(logMessage);
    }
}
