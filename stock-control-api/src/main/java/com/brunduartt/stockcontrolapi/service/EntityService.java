package com.brunduartt.stockcontrolapi.service;

import com.brunduartt.stockcontrolapi.domain.mapper.EntityMapper;
import com.brunduartt.stockcontrolapi.repository.EntityRepository;
import com.brunduartt.stockcontrolapi.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Root;
import java.util.Optional;
import java.util.function.Function;

/**
 * Default service with simple methods to save and find an entity
 * @param <ENTITY> Entity class
 * @param <DTO> Entity's DTO class
 * @param <MAPPER> Entity's Mapper class
 * @param <REPOSITORY> Entity's Repository class
 */
public class EntityService<
        ENTITY,
        DTO,
        MAPPER extends EntityMapper<DTO, ENTITY>,
        REPOSITORY extends EntityRepository<ENTITY>
        > {

    private final REPOSITORY repository;
    private final MAPPER mapper;
    private final Logger log;
    private final Class<ENTITY> entityClass;

    EntityService(REPOSITORY repository, MAPPER mapper, Class<ENTITY> entityClass) {
        this.repository = repository;
        this.mapper = mapper;
        this.log = LoggerFactory.getLogger(entityClass);
        this.entityClass = entityClass;
    }

    /**
     * Creates a new entity or updates an already existing one
     * @param dto DTO of the entity
     * @return DTO of the updated or created entity
     */
    public DTO save(DTO dto) {
        log.debug("Request to save {} : {}", entityClass, dto);
        ENTITY entity = mapper.toEntity(dto);
        entity = repository.save(entity);
        return mapper.toDto(entity);
    }

    /**
     * Finds an entity by it's id
     * @param id id of the entity
     * @return the found entity
     */
    public Optional<DTO> findById(Long id) {
        log.debug("Request to find {} by id: {}", entityClass, id);
        return repository.findById(id).map(mapper::toDto);
    }


    public Page<DTO> findAll(Specification specification, Pageable pageable) {
        log.debug("Request to get page of {} by specification and pageable: {}\n{}\n", entityClass, specification, pageable);
        return repository.findAll(specification, pageable).map(obj -> mapper.toDto((ENTITY) obj));
    }


    public Page<DTO> findAll(Pageable pageable) {
        log.debug("Request to get page of {} by pageable: {}", entityClass, pageable);
        return repository.findAll(pageable).map(obj -> mapper.toDto((ENTITY) obj));
    }

    public void deleteById(Long id) {
        log.debug("Request to get delete {} by id: {}", entityClass, id);
        repository.deleteById(id);
    }

    protected Specification<ENTITY> likeUpperSpecification(Function<Root<ENTITY>, Expression<String>> metaclassFunction, final String value) {
        return (root, query, builder) ->
                builder.like(
                        builder.upper(
                                builder.function("REPLACE", String.class,
                                        builder.function("unaccent", String.class, metaclassFunction.apply(root)),
                                        builder.literal(" "), builder.literal("")
                                )
                        ),
                        "%"+StringUtils.Unaccent(value.replaceAll(" ","").toUpperCase())+'%'
                );
    }
}
