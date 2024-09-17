import { Test, TestingModule } from '@nestjs/testing';
import { ArticleService } from './article.service';
import {getModelToken} from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleDto } from './create-article.dto';
import { Article } from './article.schema';

describe('ArticleService', () => {
    let service: ArticleService;
    let articleModel: Model<Article>;

    beforeEach(async () => {
        const mockArticleModel = {
            create: jest.fn().mockImplementation((dto) => {
                return{...dto, _id: 'someUniqueId'};
            }),
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleService,
                {
                    provide: getModelToken(Article.name),
                    useValue: mockArticleModel,
                }
            ],
            
        }).compile();

        service = module.get<ArticleService>(ArticleService);
        articleModel = module.get<Model<Article>>(getModelToken(Article.name));
    });

    describe('create', () => {
        it('should create article', async () => {
            //arrange
            const testArticle = new CreateArticleDto();
            testArticle.title = 'Effects of Test-Driven Development: A Comparative Analysis of Empirical Studies';
            testArticle.authors = 'Simo Makinen, Jurgen Munch';
            testArticle.source = 'ResearchGate';
            testArticle.doi = '10.1007/978-3-319-03602-1_10'
            testArticle.pubyear = '2014'
            
            //act
            const createTest = await service.create(testArticle);

            //assert
            expect(articleModel.create).toHaveBeenCalledWith(testArticle);
            expect(createTest._id).toBeDefined();
            expect(createTest.title).toEqual(testArticle.title);
        })
    })
})