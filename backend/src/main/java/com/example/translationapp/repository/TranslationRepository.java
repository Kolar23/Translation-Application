package com.example.translationapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.example.translationapp.entity.TranslationEntity;

public interface TranslationRepository extends CrudRepository<TranslationEntity, Long> {
}