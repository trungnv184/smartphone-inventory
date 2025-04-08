import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './schemas/inventory.schema';
import { NotFoundException } from '@nestjs/common';

describe('InventoryService', () => {
  let service: InventoryService;
  let mockInventoryModel: Partial<Model<Inventory>>;
  let mockManufacturerModel: Partial<Model<any>>;
  let mockModelModel: Partial<Model<any>>;
  let mockBodyColorModel: Partial<Model<any>>;
  let mockDataMemoryModel: Partial<Model<any>>;

  beforeEach(async () => {
    // Mock the Mongoose model methods
    mockInventoryModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    mockManufacturerModel = {
      findById: jest.fn(),
    };

    mockModelModel = {
      findById: jest.fn(),
    };

    mockBodyColorModel = {
      findById: jest.fn(),
    };

    mockDataMemoryModel = {
      findById: jest.fn(),
    };

    // Create the testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getModelToken('Inventory'),
          useValue: mockInventoryModel,
        },
        {
          provide: getModelToken('Manufacturer'),
          useValue: mockManufacturerModel,
        },
        {
          provide: getModelToken('Model'),
          useValue: mockModelModel,
        },
        {
          provide: getModelToken('BodyColor'),
          useValue: mockBodyColorModel,
        },
        {
          provide: getModelToken('DataMemory'),
          useValue: mockDataMemoryModel,
        },
      ],
    }).compile();

    // Get the service and mock models from the testing module
    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should throw NotFoundException if Manufacturer is not found', async () => {
      const dto = { manufacturerId: '123', modelId: '456', price: 1000 };

      // Mock the Manufacturer model to return null
      jest.spyOn(mockManufacturerModel, 'findById').mockResolvedValue(null);

      await expect(service.create(dto as any)).rejects.toThrow(NotFoundException);
      expect(mockManufacturerModel.findById).toHaveBeenCalledWith('123');
    });
  });
});
