import { test, expect } from '@playwright/test';
import { PetStoreAPI } from '../api/PetStoreAPI';
import { PetNameCounter } from '../models/PetNameCounter';

const newUser = {
  id: 0,
  username: 'testuserqa',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  password: 'password123',
  phone: '1234567890',
  userStatus: 1
};

test('PetStore API test', async ({ request }) => {
    const api = new PetStoreAPI(request);
  
    const createUserResponse = await api.createUser(newUser);
    console.log('Create User Response:\n', await createUserResponse.json());
    expect(createUserResponse.ok()).toBeTruthy();
  
    const getUserResponse = await api.getUser(newUser.username);
    expect(getUserResponse.ok()).toBeTruthy();
    const userData = await getUserResponse.json();
    console.log('User Data:\n', userData);
  
    const soldPetsResponse = await api.findSoldPets();
    expect(soldPetsResponse.ok()).toBeTruthy();
    const soldPets = await soldPetsResponse.json();
  
    const petsList = soldPets.map((pet: any) => ({ id: pet.id, name: pet.name }));
  
    const petNameCounter = new PetNameCounter(petsList);
    const nameCounts = petNameCounter.countNames();
    console.log('Name Counts:\n', nameCounts);
  });