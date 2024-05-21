'use strict';

const arrayToUpdate = [
  {
    "serial": "MXL3201W5F",
    "id": "62ff21b7-135a-4130-bfc6-f08fb21708c3",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXL04309X7",
    "id": "fabe6d38-c512-4504-b7f2-c6b999e640b8",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJBPHFZ",
    "id": "26814882-5d8f-4204-a7b2-4245e63e5bdb",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MJERPBA",
    "id": "9d0f4c7a-d8ae-4471-834b-40a02fd6e8f8",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL3201WFW",
    "id": "7dc8649b-429d-485c-8ce1-2124cefcecfa",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXJ00503SG",
    "id": "ef407c7f-f125-4486-a4cf-58bbe7919d9c",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXDKGA",
    "id": "ac68f80e-77f1-419d-b338-05cfd703dc57",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL3201SZS",
    "id": "655e7f0b-06c7-4939-a18e-a6d1964c5e2d",
    memory_ram_capacity: 6,
    memory_ram: [2, 4, 0, 0]
  },
  {
    "serial": "MXL318182G",
    "id": "b9d6958a-a795-4dcb-abff-5e8a0f08392a",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJ25BD9",
    "id": "5876c2b2-4edc-4d01-8736-8fe91370aa53",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL31600BS",
    "id": "648cb601-5641-4143-8066-be03497e848e",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL3201WGL",
    "id": "8b571c61-b80c-406c-9fe5-492e763d2b07",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXJ94500Q5",
    "id": "89f2f1db-aeeb-4bfa-b7b3-0fabf52b987a",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201T0L",
    "id": "afb225c6-5f83-44a8-9f50-4ddd33187918",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL05108BL",
    "id": "470a2e73-b033-45fa-94df-f8b2fa88d328",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ13K05",
    "id": "99f14c58-4f7c-46ee-a048-8606d4dcde24",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL31809W3",
    "id": "ada15de6-292c-46eb-9883-e98359358720",
    memory_ram_capacity: 6,
    memory_ram: [2, 4, 0, 0]
  },
  {
    "serial": "MJWDXM7",
    "id": "bf8dd34d-d9b3-40c8-8903-ae550d94c19c",
    memory_ram_capacity: 8,
    memory_ram: [4, 4, 0, 0]
  },
  {
    "serial": "MXJ94709Z1",
    "id": "fff1b2b9-6267-4274-9538-4e7c247e9857",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXLATM",
    "id": "7b6a08c0-0f6e-4f7e-afbb-ff9ae1076b2e",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MXL3201WN6",
    "id": "25ebeaec-2674-4d58-a55c-4fd030d31ae6",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ52B42",
    "id": "fa10f8c5-ce75-49c7-9308-44ec4022a404",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL31817PZ",
    "id": "8cd09f70-4fe4-4775-9032-21444a67ec8b",
    memory_ram_capacity: 8,
    memory_ram: [2, 2, 0, 0, 4]
  },
  {
    "serial": "MXL3201WGB",
    "id": "3413b753-29b7-48cd-9710-a4d393962dd5",
    memory_ram_capacity: 8,
    memory_ram: [2, 2, 0, 0, 4]
  },
  {
    "serial": "MJ017ED",
    "id": "3af2fa26-5dbf-4900-82e1-e6a1f4c0e7d3",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHDHRV",
    "id": "8fe38082-550e-487a-b7af-334ec586beff",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJTYGVB",
    "id": "74cb3e81-79ea-47e3-b2cd-ef5cc2cd05c7",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXJ947086Z",
    "id": "a6d37808-5c28-45ab-91c0-27e0b3eb998d",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201WNF",
    "id": "5c8d4c5b-7cc6-4633-8cae-8c080eee4bfb",
    memory_ram_capacity: 8,
    memory_ram: [4, 2, 0, 0, 2]
  },
  {
    "serial": "MXJ94500T9",
    "id": "30ab55ca-7d1f-48c3-a26d-c1a0eb04e53b",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL0430B69",
    "id": "81606da3-644d-487f-bf18-ef8b5dac8d2a",
    memory_ram_capacity: 2,
    memory_ram: [2, 0, 0, 0]
  },
  {
    "serial": "MJHETGV",
    "id": "610c5702-7687-473d-90ff-320a54c82f27",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL31817H8",
    "id": "7b6e95fa-5aff-4863-87f2-f2aa07f7075e",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJBPHCG",
    "id": "c82ad8a5-7265-4fb5-9adf-fee2b0d54373",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJHDGTC",
    "id": "71d6a2bd-a50a-4c13-ba1a-ca40418e6b76",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXJ00501R2",
    "id": "9300b42d-4f6c-4475-b969-c4e56473eef1",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201WMT",
    "id": "91ba31ad-d030-41c6-b811-19a1b1267d1f",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJWDXL1",
    "id": "6b97f717-d8a3-4d24-8903-073f807b0750",
    memory_ram_capacity: 8,
    memory_ram: [4, 4, 0, 0]
  },
  {
    "serial": "MXL3180J1M",
    "id": "adf1c98f-1675-432e-b5a5-b0fb7299a7ab",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MXL3151VLR",
    "id": "ba03f15b-673b-4234-9b60-8aa535c62835",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ52A53",
    "id": "07295f6b-9db2-4421-84ba-e1313e8f9385",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJXLAWG",
    "id": "1bd076b7-e5d5-4697-8a68-c94f03b2922b",
    memory_ram_capacity: 8,
    memory_ram: [4, 4, 0, 0]
  },
  {
    "serial": "MXL3201WP8",
    "id": "c4e648ab-b8a5-487c-b261-a8d240bffb15",
    memory_ram_capacity: 8,
    memory_ram: [4, 2, 0, 0, 2]
  },
  {
    "serial": "MJHDHYV",
    "id": "a48a336f-a212-4759-9451-95c761354348",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL051087Y",
    "id": "1c7514fb-72a2-4bf5-8a29-0fd99ea8bd8c",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MXL1390T39",
    "id": "347b9af5-b39d-4bbd-ad8d-68e61b8b30ad",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXJ94500VC",
    "id": "3e649a57-2d01-4231-a615-86986d81338c",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL04309QT",
    "id": "0990a241-4a9a-43ab-9ded-26bae3ffd13d",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ55A69",
    "id": "e8d908a9-c5c2-4d47-9ee0-12014c670ff3",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL31817JG",
    "id": "eee12245-1285-4874-a747-88d49c543e91",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJTYGVX",
    "id": "aa32b10b-9b3d-4b06-85a6-79e004214fe6",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJWDXL7",
    "id": "f91fa979-e30a-4715-9142-2722b2194379",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJHCVHT",
    "id": "d07547d3-7de4-4f48-b1af-302c2fc62564",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHDHTX",
    "id": "73f3b03e-9d23-4a65-bd45-2d2d76f30d09",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJHDHMM",
    "id": "c0ea939c-c746-4a6f-ac36-3c6911464891",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJHDHZZ",
    "id": "9fd876dc-37b7-43be-8e97-44b1a2e9e686",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MJXDKYN",
    "id": "94ed561f-16e3-432d-8c38-5b9b8dee4796",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJBPHHN",
    "id": "f3ff4131-6656-454d-a309-84dc182e9e16",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL04228SP",
    "id": "d9724541-4061-473d-b0e3-271560f0042e",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJBPHHK",
    "id": "1edc7fba-660a-486a-bba4-bdb4cb01b0a5",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJ173DC",
    "id": "a6c26d1e-d716-4bf5-8504-a6dd2b338777",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL1390RTH",
    "id": "f3d1c36e-33d4-47ea-8b47-e703b9051054",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJBPHHX",
    "id": "ed4c9a59-59da-410b-a464-dd7f884f4104",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHDHZV",
    "id": "49ec705f-9a1e-474f-9b53-4d3a479b0bad",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL1390RRH",
    "id": "1ea0b63c-6109-43b2-af64-2e3ac89d9e7a",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL1390T4K",
    "id": "be85372b-d066-4014-bfcc-5ef45c53864e",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXL1390T57",
    "id": "00e01d6b-503d-4244-8c03-3056536a89ac",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJHDKAL",
    "id": "99cc1a3f-7543-4a19-91a6-970264bf02b9",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJBPHGF",
    "id": "50f24016-e992-40b1-8a15-27ec9dfeadab",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201WP7",
    "id": "04c295a6-98fb-4581-bb5a-180624985195",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXJ00609YB",
    "id": "5db4f012-db89-437b-9cb5-a3b5339c2309",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXJ00609ZJ",
    "id": "787f1e70-6e7a-4474-833f-f8177fb0a825",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHCWFZ",
    "id": "9906d7aa-e345-4af3-a60e-77b7e5fe7d97",
    memory_ram_capacity: 8,
    memory_ram: [4, 4, 0, 0]
  },
  {
    "serial": "MXJ00609MJ",
    "id": "4bbab0a7-976c-4a59-b157-6f448954ce34",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXKDTN",
    "id": "6d2d9247-94db-48a5-a6f1-c8a2791fcc21",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJBPHFE",
    "id": "0ff6be7a-8cf7-4fac-a29a-3dab94fce191",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL31817LG",
    "id": "ce4972e5-29f5-413c-a539-ab525a12ebd7",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJBPHEB",
    "id": "aeb0e08d-82f1-4d29-9fb1-40a600107bba",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL3151VLJ",
    "id": "9ab899f2-9f3e-4add-bd40-8f4819a357cb",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ52B45",
    "id": "31fa3169-f45e-4351-bcbf-1f0e5f6166cf",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL3201WN0",
    "id": "7473a953-f211-48a2-afd7-130dbc7a9b38",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXL3201WH3",
    "id": "ef8f7344-2256-4949-93df-677146b198dc",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJBPHDR",
    "id": "106f1692-5682-41fe-9a89-7a2115c74c13",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL3201WG0",
    "id": "817092f2-fec5-41f9-bb4e-e31a6fd760c1",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJHDHZF",
    "id": "224afd6a-1a47-4629-8fb4-11cc641145ec",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJBPHFG",
    "id": "66ec3771-847c-4462-8f9b-f280b30757ea",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHDHWZ",
    "id": "6df79814-efc7-4e2d-8c57-fea612b7a46d",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJTYGTF",
    "id": "cee49985-ccbb-4203-aaef-fa6836d538d3",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJTYGVA",
    "id": "d68b307c-8536-4840-beff-4eeca01399f8",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJBPHCD",
    "id": "633c5fd0-b70b-41f4-9e35-752e6c4653f8",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MJXKDDA",
    "id": "c3768eba-ecd4-410b-ab21-0f60dbef4da1",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXJ00601ML",
    "id": "73bcb67a-8936-42c9-acd6-7b0d2a811b85",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJXKDHT",
    "id": "58a266e1-24da-4a73-9b4f-4d29947e8c2e",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXKCZM",
    "id": "0a2ac3ca-7472-4853-9c00-51ee1a5c967c",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHCWEX",
    "id": "47004bfb-f1f9-499f-913b-214512f73a4b",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL3201WGQ",
    "id": "93cf4c3d-3329-48a7-aa2d-1f1ec0671373",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXJ9460CFD",
    "id": "d4de1945-0bf8-4893-aa7b-d0746fb1d431",
    memory_ram_capacity: 2,
    memory_ram: [2, 0, 0, 0]
  },
  {
    "serial": "MJHDHYB",
    "id": "31efef41-e117-4828-9a62-d764f4109eda",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHERBW",
    "id": "49c6e98a-254c-4671-b87d-e9e90cb1814b",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL051085M",
    "id": "c693c361-bf63-4cd4-8c12-dff32ad14abf",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXL3201WFY",
    "id": "d77adffa-0926-4722-8c2a-978472cd4cb4",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJXDLHM",
    "id": "27fa8090-b0ef-4734-a61a-cd7bc942dd7b",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ51X89",
    "id": "f4b655d7-9a97-4209-9e59-bc62d924abcd",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL3151VL3",
    "id": "7a2a9c1b-69f3-433e-bc41-2a7434161fca",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MXL3201WGG",
    "id": "29652cb2-49f6-434d-83e1-c1784c691d17",
    memory_ram_capacity: 6,
    memory_ram: [2, 4, 0, 0]
  },
  {
    "serial": "MJHCVFF",
    "id": "09e46a92-e8af-4704-9a48-c5ae6efde7bc",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ52A81",
    "id": "f0aa182c-b0d7-4755-876a-258134b9479c",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJTYGTL",
    "id": "a1408b22-ca4d-4945-93b9-2597f86210a5",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJTYGXC",
    "id": "edfd9e71-760e-4fa6-9672-509e60d9e0fd",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201WGP",
    "id": "19bea415-4ab8-49ae-a1b8-cd9631e2a437",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJTYGTB",
    "id": "26de2095-4769-4126-9efe-14b8d46920aa",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJTYGWB",
    "id": "46564a03-bec4-48eb-a214-ef50545e1911",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL0430B11",
    "id": "a5787099-632e-4c93-a29d-904383ed3b26",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJXDKCK",
    "id": "e5ce4d75-2427-436c-9593-0d586507e065",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ51X64",
    "id": "943160f0-c849-44c8-aa90-16a998b9bf92",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXDKXX",
    "id": "a0484bcb-74cb-4394-abae-d2671a61efec",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL3201WGH",
    "id": "1163cc44-836e-4390-90a2-d88ca54aae89",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXL31809V6",
    "id": "a03aa2f5-f84e-41ea-9198-dbe9dcca722c",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJ52A57",
    "id": "e3a6eda8-b3b2-435b-94de-42cac88159b3",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL1370JGM",
    "id": "a980fe6f-5d1d-4d72-ab4d-cd0809446fbe",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJERGYX",
    "id": "ce16f78e-a767-47e2-8a21-a869a5a4cd64",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXKDCW",
    "id": "a2d015bf-44d5-4ec4-b094-b4ed899c2108",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJERKKH",
    "id": "f422701e-9d54-4fc6-a6b1-28ec1f0e13e5",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJXKCZL",
    "id": "6c74508f-c6d1-4084-b147-7b686655142d",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL31817J2",
    "id": "d775a239-1673-463c-b288-2659799c9b8f",
    memory_ram_capacity: 6,
    memory_ram: [2, 4, 0, 0]
  },
  {
    "serial": "MJHDKBL",
    "id": "d95c914c-dd86-4fc5-984c-48421226315a",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHDHXW",
    "id": "aff41497-d8bd-4a64-a4dd-e65b9d2625f2",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJHDHMA",
    "id": "27e01eea-6bf2-40da-9320-a469ff86cddc",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL333293Q",
    "id": "40c27892-961b-4f43-8e26-10326036e2c8",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXJ00601JR",
    "id": "b7e60104-3e80-41e8-b820-84c6b7ae8ae5",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3151VM0",
    "id": "7237d5e9-8d9e-4480-bde4-a236af4b6c37",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL31817Q1",
    "id": "51e2b817-6732-4195-bc6e-86f4206a2ae6",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJTYGVY",
    "id": "4f78b435-12d2-412f-ad1a-7f02f4119e04",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL3151VLT",
    "id": "2a060e88-839b-4e3e-a675-504c4119f15b",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJHCVTR",
    "id": "a4a28c16-c21f-4835-b257-0dd2363ecc04",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXL3201WH1",
    "id": "4e506176-aa3c-413c-a78b-ac95b99726dc",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJHDHYZ",
    "id": "980f330d-bb3b-44c2-9ddf-dabcc6fd33af",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJHDHNM",
    "id": "c3881526-e6ae-4578-a072-5aa741422ed2",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MXL3201WN2",
    "id": "42a089cd-e2d6-4b40-96c9-eee2eee8716f",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MJMMBEZ",
    "id": "8888e68b-db4a-442c-8af5-7b019f3e3f95",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ54Z84",
    "id": "27f534fc-9342-4eaf-8344-f0e1c4b28536",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHDHYG",
    "id": "da3b7e40-da80-4dcc-8e12-7d5dbdc261b3",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL333292H",
    "id": "2483dabd-1463-415f-9d88-49056b9a3d49",
    memory_ram_capacity: 6,
    memory_ram: [4, 2, 0, 0]
  },
  {
    "serial": "MJHDHNB",
    "id": "8dd0526b-986f-4e6c-86d7-d192797b2305",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJXKDKF",
    "id": "9837dce1-f66c-44f1-81ff-4552ac9477be",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHCVFB",
    "id": "eb6fd69d-a561-41ff-bfed-a133f15275e8",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJHCVFA",
    "id": "ca25bda5-864f-4c42-ae27-dff6ff99da65",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJHCWEF",
    "id": "9f533796-a9b5-4374-8362-aa4b39435649",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJ55A37",
    "id": "e9d3d453-79cf-4b68-88c2-d3f7412bbc62",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJTYGRY",
    "id": "03f434fb-b64b-41f9-8578-c26a2d5aa97e",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MXJ00503TS",
    "id": "d0783165-e50c-4ca1-9663-fc29e0f1a3c5",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJ03JPQV",
    "id": "95e4a119-9175-4219-ae42-ecb55dbc9afa",
    memory_ram_capacity: 6,
    memory_ram: [4, 2, 0, 0]
  },
  {
    "serial": "MXL4020TNT",
    "id": "c065704f-f473-4f1f-ad31-67b74785e6df",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MJBPHDH",
    "id": "a3f85bfe-d6fc-4995-92aa-486939a3aedf",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJTYGVM",
    "id": "1cdb9f98-7236-4fea-a491-05876afc4c7e",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJXDKBP",
    "id": "8a860822-dbb2-4e0d-b507-edea5a366969",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL31600JK",
    "id": "359faf95-6fd0-4312-895d-5557fa70c72b",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXL31817M0",
    "id": "2a04279d-e2cd-4230-b329-389d71d35d8f",
    memory_ram_capacity: 2,
    memory_ram: [2, 0, 0, 0]
  },
  {
    "serial": "MXJ00609N2",
    "id": "1affb49a-de0c-4fbf-93b2-5f788db4c8ac",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJHERDV",
    "id": "59dd8535-a280-4b04-bb70-e8f349b94b02",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MJBPHHP",
    "id": "d2ec1c4d-4291-4316-9a7c-40e691f63511",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJ00XUEK",
    "id": "0294e34b-47a0-479b-b0a6-24f3c670328e",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZLH",
    "id": "5ee20d67-b1ea-48f2-ae37-c4e39cf5e095",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCB",
    "id": "90a642bd-ae2d-4641-969b-d13e441b068a",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBS",
    "id": "3f0daadf-6368-4140-87af-46378baa3c12",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCR",
    "id": "7e684291-57a7-4378-bff0-e05fad113ee4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCU",
    "id": "0ab644d5-742c-4e50-b09b-e42020f8464a",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "LR3P43H",
    "id": "8d443ebd-1c2b-4768-9969-4670f982d6cf",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ00XUAH",
    "id": "c452406e-6dcc-4b6e-b486-3810b4d3c046",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZFM",
    "id": "38db5940-a757-46fe-97a8-fcd0eea6f716",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBE",
    "id": "02002f21-f2bd-479d-8967-083c56aeeaaa",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUE8",
    "id": "50819c1e-2982-4ad4-b56d-3256151bef99",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "LR7K2Z8",
    "id": "7af4e0a0-44c7-4b3a-97fa-811b431eaefc",
    memory_ram_capacity: 3,
    memory_ram: [2, 1]
  },
  {
    "serial": "CS02299330",
    "id": "ff49eedd-b926-4e62-a92b-83b914fc37fe",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJ00XUBG",
    "id": "52c84ad4-a838-4e88-82d6-09a1575e7274",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB2",
    "id": "fa313c9b-24d9-43bd-b114-98617de67cf3",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB3",
    "id": "cd0d37df-a134-4cc2-9304-da1479c09b6d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCW",
    "id": "74d5eb09-8a70-4776-b7f3-296fb187a2d2",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDZ",
    "id": "b18ff2af-db1f-4189-920d-82e18cde8d99",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUC6",
    "id": "e2865cdf-109b-4b14-a93d-4c0b8c83a967",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBV",
    "id": "536eccae-8350-4e92-b55c-7ae36d636627",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUEB",
    "id": "f9a6230f-7906-40ff-ab0b-c9f3042d21c8",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUD4",
    "id": "513504ea-1d86-4c85-802a-699c25ae842f",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAQ",
    "id": "44621081-acff-4fb1-9592-cc2a4791dfd6",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDJ",
    "id": "08e33ef7-e621-46d8-b20a-7fc2f0091a1d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAM",
    "id": "9d48d0d6-33aa-44d4-8210-b43457dc4d99",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUD9",
    "id": "7f49b58c-4d9d-4508-866c-05831c9bbbf6",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCP",
    "id": "11e8b7de-51d7-4184-b8f7-6916e1c70403",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBR",
    "id": "d5e35947-1ac8-44e9-af5a-bcd5348d71b2",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBM",
    "id": "7fca801b-e476-4d31-8b25-5e29bd07cd5f",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCE",
    "id": "da6f4619-78ab-411a-9d8d-af9b8d12e6e6",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBY",
    "id": "b524d4b2-0878-43fd-8510-1f48d5c30e27",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUED",
    "id": "6b38378a-4e54-44ac-bbd5-3891a54540c4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBC",
    "id": "c75009df-54af-434d-93c1-37d8d2f8a686",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDM",
    "id": "1aac0f74-adf5-4f05-8ee8-6a990b1e4da4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBB",
    "id": "775a60d8-f411-4a6e-a3ad-a2573c8d4e15",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBA",
    "id": "a36be391-3612-42dc-bf4f-c60690bd2f23",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCT",
    "id": "77f622b4-c13a-4066-9364-e4be15d68e6f",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBD",
    "id": "0d8bbf7a-1a55-474a-b449-08695284edc4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB4",
    "id": "a8454388-b7a7-4df0-b7e0-dc7bcec378c2",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "CS02236924",
    "id": "71e6de23-9f23-4b3c-8f9d-103476a91087",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJ00RZHJ",
    "id": "bd08192d-f546-484c-9e41-4f8515cf63e0",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDG",
    "id": "bb9b1aec-dcb4-4028-8656-ac70c02a8715",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB9",
    "id": "3a885872-5a95-47fa-902c-5c1a0de8b594",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "CS02299444",
    "id": "eefb5386-c512-4816-a8c3-7c30d9626984",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJ00XUAU",
    "id": "27864061-942f-4884-b849-4cdcd15d41e7",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZGY",
    "id": "2c65f267-b1fd-4e12-931e-df168eff3a10",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZJA",
    "id": "4625e9bb-de52-4512-a183-2725c21fca5d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUD5",
    "id": "3bddb787-d8e9-48d0-9397-9adc8c8c6329",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUE1",
    "id": "9fa85cd4-cef4-4508-bf7a-c9d228d9bcf7",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAY",
    "id": "4aee1aba-52c7-49fb-8598-1f0af531f61b",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDL",
    "id": "880f1ee0-244a-4fbf-8277-37891453ed4d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZLU",
    "id": "1ebb75a5-c8ed-4609-861f-72bdb4530ea1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUE0",
    "id": "65ea5b6f-82a7-4a11-b926-0339eacaf1a4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUER",
    "id": "59010aed-7c1d-4bde-8109-a5ab15743c35",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDB",
    "id": "08fdb98a-b56e-44a9-837a-58800bbe0c9e",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDP",
    "id": "6dcd70cb-a6a2-4f19-b1ff-c6acd9e7df11",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAT",
    "id": "76d5ebc4-050e-4e32-abd3-0c79ee3bcfc8",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB8",
    "id": "ef18755d-5e9f-401f-8c0d-cf3484df70fe",
    memory_ram_capacity: 6,
    memory_ram: [2, 4]
  },
  {
    "serial": "MJ00XUB5",
    "id": "2779bf5d-42fe-4e31-a974-e6d64a270780",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "R9WHD38",
    "id": "ddad2e99-f93a-4f55-8e7e-7ebaad1f9e93",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ00XUD1",
    "id": "6571f6b2-1086-49a9-9571-35a4dc058ac1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAJ",
    "id": "af8bee86-78f0-492a-be4d-c6483b8a08ea",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUC3",
    "id": "ab63e358-4a77-42db-b690-dea0a1bf4475",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDC",
    "id": "1a92f3be-d0a6-4d67-a557-ebd54b6d7d62",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "WB11218551",
    "id": "a41020c2-d7fd-4b32-bcd9-0be9fc3981ea",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAN",
    "id": "2832e23c-628a-48b6-89e8-a6e9b161977d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUEF",
    "id": "8be6bc37-20db-4169-8ef5-f785acb6698c",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDA",
    "id": "61748a2c-d244-4624-ba58-b8cfef04722a",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCS",
    "id": "2e6421cb-d2ee-41d6-8a92-89484604f28a",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCM",
    "id": "cb4c4991-4488-4184-924c-76ba978f7756",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MB00307640",
    "id": "0ffd71bd-9dc2-4571-ae81-eed25d4acb95",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ00XUCD",
    "id": "0755748e-d5c1-4609-a476-3f5045abac87",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUB7",
    "id": "291d141e-acb4-4cf4-86e4-f0676cd18e2b",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZMY",
    "id": "bedb1361-9b14-41dc-b5a9-449a2830f9fe",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUD7",
    "id": "8e3ad4cc-01e1-415a-9b3f-9708f241b08b",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBF",
    "id": "633a2e29-0ce3-4fbc-a750-f9d2a3d0a15d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAK",
    "id": "59d33694-708b-4c1f-90ce-2d165d5acef1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUCV",
    "id": "c0dd6fbf-1a8e-4c7b-a31d-5014b220d653",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUBU",
    "id": "ee9b0df5-18b8-407c-8669-154c2d118dc0",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUE9",
    "id": "b9a98950-2a15-444c-ba73-507084f2d04a",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUEN",
    "id": "7f91cdf7-3ffd-4c18-832e-d01316d0d4eb",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00RZG2",
    "id": "e75bfb2d-9e39-4866-a0fb-687c317cbd79",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUEQ",
    "id": "5ac6b9f1-10db-40d0-ac22-5e8e8807f2c1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "R9WHD4D",
    "id": "5645d1de-e40a-4264-96ee-c42e31f8be83",
    memory_ram_capacity: 6,
    memory_ram: [4, 2]
  },
  {
    "serial": "MJ00XUC1",
    "id": "d9859c13-cc5c-41ba-9990-76ee2756d7b4",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAZ",
    "id": "ed3cb0ce-65a7-4d6b-8712-30b1e00d4936",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUAG",
    "id": "75011bcd-2918-417d-a411-871983cd52d5",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ08H4TR",
    "id": "26b0069a-abe3-496c-918c-de436ff5f90d",
    memory_ram_capacity: 8,
    memory_ram: [8]
  },
  {
    "serial": "BWYW303",
    "id": "6cd22e07-92a7-4332-a01a-c65131bd4642",
    memory_ram_capacity: 16,
    memory_ram: [16, 0]
  },
  {
    "serial": "MP1LQD9N",
    "id": "1fe15515-2a82-447a-9051-47e2fca67556",
    memory_ram_capacity: 20,
    memory_ram: [4, 16]
  },
  {
    "serial": "5CD9103SYX",
    "id": "551676dc-0bee-4b68-883d-9bc64381774a",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "5CG95055HX",
    "id": "e237643b-5250-4bd8-b559-59a2bcb2e0a2",
    memory_ram_capacity: 16,
    memory_ram: [16, 0]
  },
  {
    "serial": "MP1LREFC",
    "id": "8f5adb08-0b25-4fde-98d6-291c06f9dcea",
    memory_ram_capacity: 20,
    memory_ram: [4, 16]
  },
  {
    "serial": "5CD147193N",
    "id": "8778848a-f74f-47e1-b485-3189c8aa4d8c",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "5CG9505539",
    "id": "aad6a7df-4b74-4cf1-b63b-0d559449cb31",
    memory_ram_capacity: 16,
    memory_ram: [16, 0]
  },
  {
    "serial": "5CG95055GC",
    "id": "6a80eb89-b24a-48a8-9fec-5279bb66b3ac",
    memory_ram_capacity: 16,
    memory_ram: [16, 0]
  },
  {
    "serial": "5CG950553Z",
    "id": "a7a1b2d0-d5ae-43ad-8a76-97421320d15b",
    memory_ram_capacity: 16,
    memory_ram: [16, 0]
  },
  {
    "serial": "PF0S7BJN",
    "id": "66249257-da49-4832-9c21-5c6788e297ea",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "PF26GP8G",
    "id": "c27a1e75-abb4-4fd9-98dc-b1ddbeaa9073",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "PF26GSY5",
    "id": "9dfd1fdd-e989-4ea8-812c-6aeca8be127b",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "PF26GP5Z",
    "id": "fea30eb9-75ef-43dd-9d82-0e5aa2c17c8f",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MJWDYP2",
    "id": "1f096e78-4f07-4a12-8e67-b5a4a94c98de",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MJWEBF0",
    "id": "c0a8acaa-d5d2-4b34-aa32-ea2a7610721b",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJWEBE2",
    "id": "45b700ba-c83b-474a-9783-4a3e89d129c6",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "LRMFC15",
    "id": "ddbfcb86-7495-4cfe-a374-a08fc4673af3",
    memory_ram_capacity: 3,
    memory_ram: [2, 1]
  },
  {
    "serial": "PF26GP9H",
    "id": "c208cd21-d94e-41d7-880e-993cb14b0bf4",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MJHDHZX",
    "id": "8d0fd9fe-0a3f-43ed-9d1b-e19dfb900634",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL3201WNB",
    "id": "ad868562-4dd4-4d6f-b2b5-5d0d50aac2cd",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJ13K82",
    "id": "554f1f26-1349-403e-b778-134cacb31476",
    memory_ram_capacity: 4,
    memory_ram: [4, 0]
  },
  {
    "serial": "MXL051084W",
    "id": "90f65c64-456a-470c-ac0f-78bb806ef77d",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MXJ94500WL",
    "id": "6aa4f6a5-3133-4e25-8bda-b1bf6ce0b571",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJ645EE",
    "id": "e1c2b69c-d2cc-4473-b699-dd42432627b9",
    memory_ram_capacity: 16,
    memory_ram: [4, 4, 4, 4]
  },
  {
    "serial": "MJWDYF0",
    "id": "86533ed0-13cb-4daa-bc2a-47012d3346ed",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "PF26GP7Y",
    "id": "68e1450d-0e32-426e-834d-18928e1661c8",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MJ00XUEJ",
    "id": "97c2684e-e2b0-4ebd-8ac1-dd07c04199e1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MJ00XUDR",
    "id": "1d33ceac-e4d9-485c-8a38-60dce4b16eb1",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL05108C5",
    "id": "0b583e88-33f7-49d1-a7b5-1185e67e9682",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "MXJ00609W7",
    "id": "f7ee7723-6223-4409-a679-a0e2e25e715e",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXL3201WGR",
    "id": "dd76375c-420f-4a38-8dc9-748820ee4917",
    memory_ram_capacity: 4,
    memory_ram: [2, 2, 0, 0]
  },
  {
    "serial": "MJWEBC8",
    "id": "ae9f4e53-20b3-4142-9f70-cb8455a3db29",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MXJ00501QM",
    "id": "d666651c-d81b-4792-a403-98978ffdfd8e",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "MJ00XUEM",
    "id": "521f2f51-7c57-4189-84c1-83cb48b1f17d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  },
  {
    "serial": "MXL3201WH8",
    "id": "fb3164be-ca87-4c3e-9fe2-364fe03a6a0f",
    memory_ram_capacity: 6,
    memory_ram: [2, 2, 2, 0]
  },
  {
    "serial": "PF26GV4P",
    "id": "ab35654f-12e9-42a6-aa2c-6488be81bb93",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MXL3201WGV",
    "id": "dbeb7314-6355-407a-bcb4-c2f82fe5d44b",
    memory_ram_capacity: 4,
    memory_ram: [4, 0, 0, 0]
  },
  {
    "serial": "MXJ00503SX",
    "id": "cd356a10-03eb-4263-81bc-ba3a97022195",
    memory_ram_capacity: 2,
    memory_ram: [2, 0, 0, 0]
  },
  {
    "serial": "MXJ94500ZJ",
    "id": "05717f9d-2544-455c-8e1c-7e13ef034549",
    memory_ram_capacity: 4,
    memory_ram: [2, 2]
  },
  {
    "serial": "PF26GT80",
    "id": "87360d6c-fc55-47c9-8161-184abeeb9335",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MP1LQ9A0",
    "id": "18edcb45-42ca-45f0-9d17-8dc43e3b1402",
    memory_ram_capacity: 20,
    memory_ram: [4, 16]
  },
  {
    "serial": "PF26P876",
    "id": "ba6df535-ff1a-4af1-ae60-63e82d995b7d",
    memory_ram_capacity: 16,
    memory_ram: [8, 8]
  },
  {
    "serial": "MP1LQD8Q",
    "id": "27e8cbdf-a138-4eb3-8b40-2bbf8c1ac450",
    memory_ram_capacity: 20,
    memory_ram: [4, 16]
  },
  {
    "serial": "PF26GM8G",
    "id": "ba167798-b264-42a5-9e25-35df7b3a647d",
    memory_ram_capacity: 8,
    memory_ram: [4, 4]
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Promise.all(
      arrayToUpdate.map(async ({ id, memory_ram, memory_ram_capacity }) => {
        return await queryInterface.bulkUpdate('device_computers', {
          memory_ram_capacity,
          memory_ram
        }, {
          id
        })

      })
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
