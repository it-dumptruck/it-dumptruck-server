# IT dumptruck API Server

## GET /dumps
덤프 리스트 조회

### parameter
없음

### response
#### status code : 200
```
{
    dumps: [
        {
            groupName: 'Amazon',
            dumps: [
                {
                    dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
                    dumpName: 'Solution Architect Associate (C02)',
                    image: 'https://dumptruck-assets.s3.ap-northeast-2.amazonaws.com/icons/saa.png',
                    lastUpdated: 1628178571
                }
            ]
        }
    ]
}
```

## GET /dumps/{dump_id}/{question_token}
문제 조회

### parameter
* dump_id : 덤프 아이디
* question_token : 시간 제한이 있는 일회용 문제 번호 토큰. 미 입력시 첫 번째 문제 조회.

### response
#### status code : 200
```
{
    “id": 123,
    “question": "문제",
    “answer": [“A", "C"],
    “list": [“보기A", “보기B", “보기C", “보기D"],
    “next_id": "eaca2046207dc8f58b4941552d0932b86ff03d5e", //다음 문제의 question_token
    “prev_id": "eaca2046207dc8f58b4941552d0932b86ff03d5e", //이전 문제의 question_token
    “description": “해설(없을수도있음 없으면 null)",
}
```
#### status code : 403
접근 권한이 없거나 만료된 문제 토큰을 입력한 경우

#### status code : 404
존재하지 않는 덤프 아이디인 경우
