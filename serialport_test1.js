const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const port = new SerialPort({
  path: '/dev/tty.usbmodem143401',
  baudRate: 9600,
  autoOpen: false,
})

port.open(function (err) {
  if (err) {
    console.log('port open failed')
    return 
  }
  console.log('port open successful')
})
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', (data) => {
    console.log(data)
    //var buf = Buffer.from('Node js');
    var buf = Buffer.from('4e6f6465206a73d', 'hex') 
    //ASCII 'N'=0x4e, 'o'=0x6f, 'd'=0x64, 'e'=0x65, 'j'=0x6a, 's'=0x73, '\r'=0x0d, '\n'=0x0a
    port.write(buf) 
    //port.write('Node js\n') // you can also send
    
    port.drain(err => {
        if (err) return
        console.log('send finished')
    })    
})