
export default {
    getNews() {
        return Promise.resolve([{
            "id": 1,
            "created_at": "2020-07-17T14:06:03.730186+02:00",
            "updated_at": "2020-09-12T14:51:17.086186+02:00",
            "title": "Test clanokds adas dadsa dsa  dsas dx",
            "body": "",
            "short": "<p>Skrateny tvar :)&nbsp;</p>\n",
            "slug": "test-clanok2",
            "published": true,
            "viewed": 1,
            "created_by": {
                "id": 1,
                "email": "simko24@gmail.com",
                "first_name": "Sebo",
                "last_name": "Simko"
            }
        }, {
            "id": 2,
            "created_at": "2020-07-17T14:06:03.730186+02:00",
            "updated_at": "2020-09-12T14:51:17.086186+02:00",
            "title": "Test clanokds adas dadsa dsa  dsas dx",
            "body": "",
            "short": "<p>Skrateny tvar :)&nbsp;</p>\n",
            "slug": "test-clanok",
            "published": true,
            "viewed": 2,
            "created_by": {
                "id": 1,
                "email": "simko24@gmail.com",
                "first_name": "Sebo",
                "last_name": "Simko"
            }
        }]);
    }
}
