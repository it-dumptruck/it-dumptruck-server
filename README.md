# IT dumptruck API Server

## GET /auth
JWT 토큰 발급 요청

### parameter
없음

### header
* uid : 공개 토큰(필수 X)

### response
#### status code : 200
```
{
    "uid": "23jfviox3", //유효한 uid 입력시 동일한 uid 반환. 미입력시 무작위로 생성된 uid 반환
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ0ZXN0In0.pb9s5hMjqlksgj6gPASw1A5e4LpVNxBWHoQo2mKvgdQ" //발급된 JWT 토큰
}
```

#### status code : 400
크롤링 의심 등으로 인해 토큰 발급에 실패한 경우.

## GET /dumps
덤프 리스트 조회

### parameter
없음

### header
* token : JWT 토큰

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
                    lastUpdated: 1628178571,
                    totalQuestion: 691 //전체 문제 수
                }
            ]
        }
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

## GET /dumps/{dump_id}/{question_token}
개별 문제 조회

### parameter
* dump_id : 덤프 아이디
* question_token : 문제 번호 토큰. 미 입력시 첫 번째 문제 조회.

### header
* token : JWT 토큰
* type : sequence(기본값) / random / marked

### response
#### status code : 200
```
{
    “id": 123,
    “question": "문제",
    “question_en": "Question",
    “answer": [“A", "C"],
    “list": [“보기A", “보기B", “보기C", “보기D"],
    “list_en": [“A", “B", “C", “D"],
    “prev_id": "4", //이전 문제의 question_token (없을경우 null)
    “next_id": "6", //다음 문제의 question_token (없을경우 null)
    “description": “해설(없을수도있음 없으면 null)",
    "marked": true, //마킹 여부
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우
question_token이 잘못된 경우

## GET /marks/{dump_id} (미완성)
마킹한 문제 리스트 조회

### parameter
* dump_id : 덤프 아이디

### header
* token : JWT 토큰

### response
#### status code : 200
```
{
    lists: [
        {
            “id": 123,
            “question": "문제 (최대 100자. 이후 ... 처리)",
        }
    ]
}
```
#### status code : 401
JWT 토큰이 잘못되었거나 만료된 경우 (토큰 재발급 후 재요청 필요)

#### status code : 404
존재하지 않는 덤프 아이디인 경우

## POST /marks/{dump_id}/{question_token}
마킹(별표처리)

### parameter
* dump_id : 덤프 아이디
* question_token : 문제 번호 토큰.

### header
* token : JWT 토큰
* type : POST (등록) / DELETE (삭제)

### response
#### status code : 200
```
{
    "marked": true //처리 후 상태
}
```
#### status code : 403
접근 권한이 없거나 만료된 문제 토큰을 입력한 경우

#### status code : 404
존재하지 않는 덤프 아이디인 경우
question_token이 잘못된 경우