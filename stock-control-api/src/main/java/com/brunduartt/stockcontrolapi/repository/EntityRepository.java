package com.brunduartt.stockcontrolapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface EntityRepository<ENTITY> extends JpaRepository<ENTITY, Long>, JpaSpecificationExecutor<ENTITY> {

}
