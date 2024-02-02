import { run } from './yourFile'; // import the function to be tested
import { InvalidArgumentError } from './errors'; // import the error class

describe('run', () => {
  it('creates a computer with all required parameters', async () => {
    // create params with all required parameters for a computer
    const params = {
      repository: 'someRepository',
      category: CategoryDefault.COMPUTERS,
      categoryId: 'someId',
      deviceId: 'someDeviceId',
      hardDriveCapacityId: 'someCapacityId',
      hardDriveTypeId: 'someTypeId',
      processorId: 'someProcessorId',
      memoryRamCapacity: 'someRam',
      operatingSystemId: 'someOsId',
      operatingSystemArqId: 'someArqId',
      ipAddress: 'someIpAddress',
      macAddress: 'someMacAddress'
    };
    await expect(run(params)).resolves.toBeUndefined();
  });

  it('throws an error when creating a computer with missing parameters', async () => {
    // create params with missing parameters for a computer
    const params = {
      repository: 'someRepository',
      category: CategoryDefault.COMPUTERS,
      categoryId: 'someId',
      deviceId: 'someDeviceId',
      hardDriveCapacityId: 'someCapacityId',
      hardDriveTypeId: 'someTypeId',
      processorId: 'someProcessorId',
      memoryRamCapacity: 'someRam',
      // missing operatingSystemId, operatingSystemArqId, ipAddress, macAddress
    };
    await expect(run(params)).rejects.toThrow(InvalidArgumentError);
  });

  it('creates a hard drive with all required parameters', async () => {
    // create params with all required parameters for a hard drive
    const params = {
      repository: 'someRepository',
      category: CategoryDefault.HARDDRIVE,
      categoryId: 'someId',
      deviceId: 'someDeviceId',
      hardDriveCapacityId: 'someCapacityId',
      hardDriveTypeId: 'someTypeId',
      health: 'someHealth'
    };
    await expect(run(params)).resolves.toBeUndefined();
  });

  it('throws an error when creating a hard drive with missing parameters', async () => {
    // create params with missing parameters for a hard drive
    const params = {
      repository: 'someRepository',
      category: CategoryDefault.HARDDRIVE,
      categoryId: 'someId',
      deviceId: 'someDeviceId',
      hardDriveCapacityId: 'someCapacityId',
      hardDriveTypeId: 'someTypeId',
      // missing health
    };
    await expect(run(params)).rejects.toThrow(InvalidArgumentError);
  });
});