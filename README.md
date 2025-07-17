# 📜 cy-toast
코드잇 중급프로젝트용 toast/snackbar 라이브러리 패키지 개발

<br></br>

## ✨ Features
- 단일 API로 간편하게 toast/snackbar 호출 가능
- 자유로운 커스텀 기능 제공
- React기반 createPortal 렌더링
- 자동 사라짐 (duration)
- close 함수 제공

<br></br>

## 💡 Install
```bash
npm install cy-toast
```

<br></br>

## 🔨 Usage
### 1. ToastRender 루트 컴포넌트 등록
```tsx
// RootLayout.tsx or toast 사용할 컴포넌트에 ToastRender 컴포넌트 등록
import { ToastRender } from 'cy-toast';

const TestComponent = () => {
  return (
    <ToastRender/> {/*ToastRender 컴포넌트 추가*/}
    <Page/>
  )
}

```

### 2. 토스트 사용 (기본 텍스트)
```tsx
import { toast } from 'cy-toast';

toast.run('저장되었습니다!',{ duration: 3000}};
```

### 3. 토스트 사용 (사용자 정의 컴포넌트)
```tsx
import { toast } from 'cy-toast';

toast.run((close) => (
  <div className="bg-black absolute top-[50%] left-[50%] translate-x-[-50%] rounded-[10px]">
    <span>내 위키 링크가 복사되었습니다.</span>
    <button onClick={close} className="ml-4 underline">닫기</button>
  </div>
), { duration: 10000 });
```

<br></br>

## 🚀 메서드
| 인자        | 타입                                                | 설명                      |
| --------- | ------------------------------------------------- | ----------------------- |
| `content` | `ReactNode` or `(close: () => void) => ReactNode` | 토스트에 표시할 내용             |
| `options` | `{ duration?: number }`                           | 자동 사라짐 시간 (ms, 기본 3000) |

<br></br>

## 🧩 Type
`onClose`는 `() => void` 타입입니다.
```tsx
toast.run((close) => <MyToast onClose={close} />);
```
