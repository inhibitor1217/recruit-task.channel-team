# recruit-task.channel-team

채널팀 채용 프로세스 중 과제를 제출하는 repository입니다.

## Commands

- Launch development server

```
$ yarn start
```

- Build project

```
$ yarn build

# then, serve the built content
$ npx serve -s build/
```

## 설명

안내해주신 요구 사항을 따라가며, 어떻게 구현했는지 간략하게 설명드리겠습니다.

### 요구 사항

> - react, webpack을 베이스로 사용하여 개발
> - 보일러 플레이트(create-react-app 등)를 사용하지 않아야 함.

- `react@17` 버전에서 function component와 hook을 주력으로 개발했습니다. CRA를 사용하지 않고 webpack, webpack-dev-server, babel을 설정했습니다. (`webpack.config.js`, `.babelrc`) CRA로 프로젝트 하나 만든 뒤 eject해서 참고하긴 했습니다.
- `react-hot-loader`를 넣어서 HMR이 적용됩니다.
- Typescript도 적용했습니다. webpack에서 `ts-loader`로 번들링하고 babel에 관련된 preset과 plugin을 넣어주었습니다.
- ESLinet와 Prettier를 적용했습니다.

> - 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함.

- 버튼을 누르면 `orderByThunk` thunk가 dispatch됩니다. 이 thunk에서는
  1. state의 `orderBy`나 `order`를 변경하고,
  2. 커서를 초기화합니다. (필터/정렬 parameter가 변경되면 무조건 커서를 초기화합니다.)
- selector를 거친 리스트를 view에서 그리고 있습니다.

> - 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치)

- 어떤 필드를 검색 대상으로 할지 모르겠어서 전부 검색 대상으로 했습니다.
- Case insensitive 비교는 lower case로 내린 다음 했습니다. `String.prototype.includes` 로 찾으면 부분일치 조건에 해당하는 국가를 찾을 수 있습니다.

`src/utils/country.ts:63`

```
const contains = (haystick: string, needle: string): boolean =>
    haystick.toLocaleLowerCase().includes(needle.toLocaleLowerCase());
```

> - 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.

- 삭제할 때는 `removeThunk` thunk를 dispatch합니다.
- 국가에 unique key라고 할 수 있는 게 없어서, `uuid` 패키지를 써서 uuidv4 id를 하나씩 나눠줬습니다. 삭제할 때는 id를 parameter로 받습니다.
- 커서가 삭제할 국가의 id와 일치하면 커서를 한 칸 앞으로 당겨줍니다.

> - 나라 정보를 입력해서 Row를 추가할 수 있어야 함.

- 우측 상단의 '+' 버튼으로 국가 추가 form을 toggle할 수 있습니다.

> - 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.

- Redux에 거의 모든 상태가 저장되어 있습니다. 언급해주신 나라 목록, 정렬 상태, 검색어 관련 action/reducer는 `src/store/modules/countries.ts`에 구현되어 있습니다.
- `countries` module의 상태 설명입니다.

```
enum CountriesOrderBy {
  code,         // 국가 코드
  name,         // 이름
  capital,      // 수도
  region,       // 대륙
  callingCode,  // 국가 전화번호
}

enum CountriesOrder {
  ascending,
  descending,
}

type CountriesState = {
  pending: boolean;                           // API 로딩 중인지?
  error?: Error;                              // API 에러
  list?: { id: string; country: Country }[];  // Raw 국가 리스트
  cursor?: string;                            // Pagination 할 때 쓰는 커서
  orderBy: CountriesOrderBy;                  // 정렬 기준
  order: CountriesOrder;                      // 오름차순/내림차순
  keyword: string;                            // 현재 검색어
  add: boolean;                               // 국가 추가 창이 열려 있는지?
};
```

- 예전부터 redux를 적용할 때는 Ducks 패턴을 쓰고 있어서 그렇게 했습니다.
- `reselect` 패키지를 사용했습니다. Store에 국가 리스트가 저장되어 있고, 차례대로 `검색어 필터링 -> 정렬 -> Pagination`을 거쳐 view에 보여줄 리스트가 만들어집니다. 이 과정을 정의한 `selector`를 통해 memoization합니다. (`src/store/selectors/countries.ts`)

> - Network 통신은 redux middleware를 통해 되어야 함.

- `redux-thunk`를 사용했습니다.
- `loadThunk` thunk에서 `datasource.countries().get()` request를 보냅니다.
- API 통신 쪽은 `datasource/api` 아래에 구현되어 있습니다.

### 추가 요구 사항

> - 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩

- 혹시 몰라 안내해주신 api documentation도 읽어봤는데 pagination을 지원하진 않아서, api로는 한번에 다 불러오고 뷰에만 조금씩 불러오는 것으로 이해했습니다.
- State에 `cursor`라는 field를 정의하고, 필터+정렬된 리스트에서 id가 `cursor` 앞쪽에 있는 국가들만 뷰에 나타납니다.
- `src/store/selectors/countries.ts`에 `paginatedContries` selector에 구현되어 있습니다.
- 스크롤 시 `cursor`를 업데이트 할 수 있도록, hook을 정의했습니다.
  - `useScrollPosition` hook은 scroll container에 붙일 ref를 주고, scroll extent와 위치를 받을 수 있습니다.
  - `useCallbackOnScrollEnd` hook에서, scroll extent, position에 따라 주어진 callback을 실행합니다.

> - form 라이브러리(redux-form, formik 등) 사용

- `redux-form` 패키지를 처음 써 보았습니다.
- 국가 추가하는 form에 sync validation을 넣었습니다. 국가 코드와 이름이 필수값이며, 국가 전화번호는 콤마로 구분된 숫자 리스트가 되도록 했습니다.
- `src/components/interactions/AddCountryForm.tsx`에 구현됭 있습니다.

> - cross browsing 적용

- Styling에는 `styled-component` 패키지를 사용했습니다.
- `styled-normalize` 패키지를 사용하여 cross-browsing이 적용되었다..고 믿고 있습니다.

> - 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)

- `src/components/interactions/KeywordInput.tsx`를 보면, `<input>` element의 `onChange`에 debounce를 걸어서 `setKeyword` thunk를 적절하게 dispatch합니다.
