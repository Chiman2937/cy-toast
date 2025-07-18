# 📜 cy-toast

코드잇 중급 프로젝트용 toast/snackbar 라이브러리 패키지입니다.

<br></br>

## ✨ Features

- headless ui로 자유로운 커스터마이징 제공
- React 기반 lightweight toast 시스템
- `open/close` 애니메이션을 위한 상태 값 제공
- 각 Toast의 순서를 기반으로 애니메이션 커스터마이징 가능
- 수동/자동 닫기 지원 (`duration=0`으로 무한 지속 가능)

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

toast.run(
  ({ close }) => (
    <div className="toast">
      저장되었습니다! <button onClick={close}>닫기</button>
    </div>
  ),
  { duration: 3000 }
);
```

### 3. 토스트 사용 (사용자 정의 컴포넌트)

```tsx
import { toast } from 'cy-toast';
import clsx from 'clsx';

toast.run(
  ({ close, isClosing, isOpening, index }) => (
    <div
      className={clsx(
        'toast-base',
        isClosing &&
          index < 3 &&
          'animation-slide-down-out pointer-events-none',
        isOpening && 'animation-slide-down-in',
        index === 1 && 'translate-y-[10px] scale-90',
        index === 2 && 'translate-y-[15px] scale-80',
        index >= 3 && 'translate-y-[20px] scale-70 opacity-0'
      )}
    >
      <Icon />내 위키 링크가 복사되었습니다.
      <button onClick={close}>닫기</button>
    </div>
  ),
  { duration: 10000 }
);
```

<br></br>

🚀 API

| 매개변수  | 타입                                                                   | 설명                                                      |
| --------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| `content` | `(context: ToastContext) => React.ReactNode`                           | 표시할 토스트 JSX를 반환하는 함수                         |
| `options` | `{ duration?: number; closeDuration?: number; openDuration?: number }` | 애니메이션 및 유지 시간 옵션 (`0` 지정 시 자동 종료 없음) |

<br></br>
🧩 ToastContext 타입
토스트 컨텐츠에 전달되는 객체는 다음과 같은 구조입니다.

```ts
interface ToastContext {
  close: () => void; // 수동 닫기 함수
  isClosing: boolean; // 닫히는 중 여부 (true면 닫히는 애니메이션)
  isOpening: boolean; // 열리는 중 여부 (true면 열리는 애니메이션)
  index: number; // 토스트 표시 순서 (최신이 0)
}
```

🧪 예제

```tsx
toast.run(({ close, isOpening, isClosing, index }) => (
  <div
    className={clsx(
      'toast-base',
      isOpening && 'fade-in',
      isClosing && 'fade-out',
      index === 1 && 'translate-y-[10px]',
      index >= 2 && 'translate-y-[20px] opacity-80'
    )}
  >
    토스트 메시지입니다!
    <button onClick={close}>닫기</button>
  </div>
));
```
