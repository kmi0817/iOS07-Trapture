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
    return this.postingsRepository.find({
      where: [
        { title: Like(`%${conditions.keyword}%`) },
        { period: conditions.period },
        { headcount: conditions.headcount },
        { budget: conditions.budget },
        { location: conditions.location },
        { season: conditions.season },
        { vehicle: conditions.vehicle },
      ],
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
