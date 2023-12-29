import Text from '@common/Text'
import Button from '@common/Button'
import Input from '@common/Input'
import TextField from '@common/TextField'
import Alert from '@common/Alert'
import { useAlertContext } from '@contexts/AlertContext'
import './App.css'

function App() {
  const { open } = useAlertContext()

  return (
    <div>
      <Text typography="t1" display="block" color="red">
        t1
      </Text>
      <Text typography="t2">t1</Text>
      <Text typography="t3">t1</Text>
      <Text typography="t4">t1</Text>
      <Text typography="t5">t1</Text>
      <Text typography="t6">t1</Text>
      <Text typography="t7">t1</Text>
      <div style={{ height: 10, width: ' 100%', background: 'red' }}>
        <Button color="success">클릭</Button>
        <Button color="error">클릭</Button>
        <Button>클릭</Button>
        <Button color="success" weak={true}>
          클릭
        </Button>
        <Button color="error" weak={true}>
          클릭
        </Button>
        <Button weak={true}>클릭</Button>
        <Button full disabled>
          클릭
        </Button>
        <div style={{ height: 10, width: ' 100%', background: 'red' }}>
          <Input placeholder="아이디" aria-invalid={false} />
          <Input placeholder="아이디" aria-invalid={true} />
          <TextField label="아이디" />
          <TextField label="비밀번호" hasError />
        </div>
        <div style={{ height: 10, width: ' 100%', background: 'red' }}>
          {/* <Alert title="dddd" open={true} onButtonClick={() => {}} /> */}
          <Button
            onClick={() => {
              open({
                title: '확인',
                description: '확인확인',
                onButtonClick: () => {},
              })
            }}
          >
            열기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
