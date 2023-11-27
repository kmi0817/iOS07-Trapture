import { POSTINGS_REPOSITORY } from '../postings.constants';
import { postingSearchCondition } from '../postings.types';
import { Posting } from '../entities/posting.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PostingsRepository {
  constructor(
    @Inject(POSTINGS_REPOSITORY)
    private postingsRepository: Repository<Posting>
  ) {}

  async save(posting: Posting) {
    return this.postingsRepository.save(posting);
  }

  async find(conditions: postingSearchCondition) {
    const where: any[] = [
      { title: Like(`%${conditions.keyword}%`) },
      { period: conditions.period },
      { headcount: conditions.headcount },
      { budget: conditions.budget },
      { location: conditions.location },
      { season: conditions.season },
      { vehicle: conditions.vehicle },
    ];

    if (conditions.theme) {
      where.push({
        postingThemes: { tag: { id: conditions.theme.id } },
      });
    }

    if (conditions.withWho) {
      where.push({
        postingWithWhos: { tag: { id: conditions.withWho.id } },
      });
    }

    return this.postingsRepository.find({
      where: where,
      relations: {
        writer: true,
        budget: true,
        headcount: true,
        location: true,
        period: true,
        season: true,
        vehicle: true,
        postingThemes: true,
        postingWithWhos: true,
      },
    });
  }

  async findOne(id: string) {
    return this.postingsRepository.findOne({
      where: { id },
      relations: {
        writer: true,
        budget: true,
        headcount: true,
        location: true,
        period: true,
        season: true,
        vehicle: true,
      },
    });
  }

  async update(id: string, posting: Posting) {
    return this.postingsRepository.update(id, posting);
  }

  async remove(posting: Posting) {
    return this.postingsRepository.remove(posting);
  }
}
