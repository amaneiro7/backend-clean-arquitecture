
const {brandsData} = require("../BrandData/brands")
const { inputTypes } = require("./inputType")

const keyboardModel = [
    {
        id: '5dee5e21-4e31-43dd-8c72-21f0a1ea15aa',
        name: 'RT7D20',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Dell')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: 'ed99335d-ce74-431d-a915-515a94d4a639',
        name: 'GK-070006/U',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Genius')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'f3e8e09c-a3ef-490b-b774-b2226d603b50',
        name: 'GK-100016',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Genius')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'a48f9411-7367-46ca-a684-1d5f6bb6846d',
        name: 'K639',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Genius')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: '527f97b0-1123-4445-8825-2eec0b50ef7e',
        name: 'KB-100011',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Genius')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: '8f3c1020-4921-4fe5-998d-bd2efdf4843c',
        name: 'KU-0138',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Genius')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'a4d297d2-6917-4849-9aed-f0546e1a4b63',
        name: 'KB-0316',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: '1cd5e087-265d-48a4-b57f-7810c008a12d',
        name: 'KU-0133',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'b45774e5-0108-4605-9dab-0ee4c0bc179b',
        name: 'KU-0316',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'd4f6ccbf-e717-4f98-b4f9-5fb82ffb8aff',
        name: 'PR1101U',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '54323360-8ae7-4108-917f-a7a9413ff47c',
        name: 'SK-2085',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '1816f948-e1ae-4c39-ba89-5b940aea6c9e',
        name: 'SK-2880',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: 'bc02b0ae-d1a6-4c35-a819-c5ed7982c719',
        name: 'SK-2885',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Hewlett-Packard')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '3f25de38-73df-4ed0-b13e-d762f54b15d0',
        name: 'KB-0225',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'IBM')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'PS/2')[0].id
    },
    {
        id: 'c6631210-f08a-446c-82b0-61ccb6d0c563',
        name: 'KU-0225',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Lenovo')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '2056972b-779d-47d4-a156-959d9edf697a',
        name: 'KUF0452',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Lenovo')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'f169fb2d-91cc-4abc-95c4-3bad86551e11',
        name: 'LXH-EKB-10YA',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Lenovo')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '5ee0a48a-40fe-4112-9c04-fc38df105b6d',
        name: 'SK-8825',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Lenovo')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: '2523d283-95f8-4fa2-a9e2-c817dd84dda5',
        name: '1366',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Microsoft')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
    {
        id: 'd57b3c62-1b3f-4cfb-9e3c-76faf9e5f25d',
        name: 'KU-1079',
        categoryId: 10,
        brandId: brandsData.filter(brand => brand.name === 'Microsoft')[0].id,
        inputType: inputTypes.filter(inputType => inputType.name === 'USB')[0].id
    },
]

module.exports = { keyboardModel }

