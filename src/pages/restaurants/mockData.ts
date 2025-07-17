const dataRestaurantList = {
  data: [
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000001',
      name: 'Downtown Diner',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-10T14:23:45Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000002',
      name: 'Lakeside Grill',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-12T09:11:02Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000003',
      name: 'Mountain View Café',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-13T10:45:30Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000004',
      name: 'Ocean Breeze',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-14T08:20:10Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000005',
      name: 'Sunset Bar',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-14T18:15:00Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000006',
      name: 'Forest Cabin Eatery',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-15T07:50:22Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000007',
      name: 'City Lights Lounge',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-15T12:10:35Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000008',
      name: 'Garden Fresh Bistro',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-16T09:05:55Z',
    },
    {
      restaurant_id: 'a1b2c3d4-1111-aaaa-bbbb-000000000009',
      name: 'Midnight Meals',
      created_by: 'u1234-aaaa-0001',
      created_at: '2025-07-16T22:30:00Z',
    },
  ],
  meta: {
    page: 1,
    per_page: 20,
    total: 9,
  },
};

const dataRestaurantDetail = {
  restaurant_id: 'c1a2b3d4-…',
  name: 'Downtown Diner',
  created_by: 'u1234-…',
  created_at: '2025-07-10T14:23:45Z',
  events: [
    {
      person_external_id: 'face-xyz123',
      event_start: '2025-07-16T14:35:10Z',
      event_end: '2025-07-16T14:35:25Z',
      image_start:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_FQ-jboTRk3wgtsbVujDQo-VmjzPdYu5Jw&s',
      image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
      sub_events: [
        {
          person_external_id: 'face-xyz123',
          camera_id: 'cam-123',
          event_start: '2025-07-16T14:35:10Z',
          event_end: '2025-07-16T14:35:25Z',
          image_start:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv_FQ-jboTRk3wgtsbVujDQo-VmjzPdYu5Jw&s',
          image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
        },
        {
          person_external_id: 'face-xyz123',
          camera_id: 'cam-456',
          event_start: '2025-07-16T14:35:10Z',
          event_end: '2025-07-16T14:35:25Z',
          image_start: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
          image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
        },
      ],
    },
    {
      person_external_id: 'face-abc789',
      event_start: '2025-07-16T14:36:05Z',
      event_end: '2025-07-16T14:36:15Z',
      image_start: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
      image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
      sub_events: [
        {
          person_external_id: 'face-xyz123',
          camera_id: 'cam-789',
          event_start: '2025-07-16T14:35:10Z',
          event_end: '2025-07-16T14:35:25Z',
          image_start: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
          image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
        },
        {
          person_external_id: 'face-xyz123',
          camera_id: 'cam-666',
          event_start: '2025-07-16T14:35:10Z',
          event_end: '2025-07-16T14:35:25Z',
          image_start: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
          image_end: 'https://fcloud.abc.xyz/snapshots/evt1/frame1.jpg',
        },
      ],
    },
  ],
  videos: [
    {
      video_id: 'vid-111a',
      camera_id: 'cam-aaa1',
      filename: 'DowntownDiner_1_20250715_080000_090000.mp4',
      recorded_date: '2025-07-15',
      start_time: '2025-07-15T08:00:00Z',
      end_time: '2025-07-15T09:00:00Z',
      uploaded_at: '2025-07-15T09:05:00Z',
    },
  ],
};

export { dataRestaurantList, dataRestaurantDetail };
