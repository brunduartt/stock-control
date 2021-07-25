package com.brunduartt.stockcontrolapi.domain.mapper;

import java.util.List;

/**
 * Basic mapper interface
 * @param <D> Entity's DTO class
 * @param <E> Entity class
 */
public interface EntityMapper <D, E> {

    E toEntity(D dto);

    D toDto(E entity);

    List<E> toEntity(List<D> dtoList);

    List <D> toDto(List<E> entityList);
}