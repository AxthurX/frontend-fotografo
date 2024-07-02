

export interface wsFile {
  file: File;
  name: string;
  size: number;
  sent: number;
  file_sent: boolean;
  sending: boolean;
  ready_to_send: boolean;
  status: string;
  error: number;
}

export interface sendStatus {
  name: string;
  size: number;
  sent: number;
  sending: boolean;
  status: string;
}

export class asyncSendFileWS {
  private files: Array<wsFile>;
  private  expected_upload_quantity: number;
  private  sucess_upload_quantity: number;
  private  requirement: object;
  private  sector: string;
  private  has_error: boolean;
  private  hash: string | null;

  constructor(
    filearr: Record<string, File>,
    requirement: object,
    sector: string,
    requirement_hash?:string
  ) {
    this.files = [];
    this.requirement = requirement;
    this.expected_upload_quantity = 0;
    this.sucess_upload_quantity = 0;
    if(requirement_hash)
      this.hash = requirement_hash;
    else 
      this.hash = null;
    this.sector = sector;
    this.init(filearr);
    this.has_error = false;
  }

  init(filearr: Record<string, File>) {
    for (const key in filearr) {
      if (filearr[key] instanceof File && filearr[key] != undefined) {
        this.files.push({
          file: filearr[key],
          name: `${key.trim()}.${filearr[key].name.split(".").at(-1)}`,
          size: filearr[key].size,
          sent: 0,
          file_sent: false,
          sending: false,
          ready_to_send: false,
          status: "Esperando fila...",
          error: 0,
        });
        this.expected_upload_quantity += 1;
      }
    }
  }

  async sendFiles(updateUploadStatus: (currState: Array<sendStatus>) => void) {
    const promises = [];

    for (let i = 0; i < this.files.length; i++) {
      console.log("Promise: ", i);
      promises.push(this.operator(i, updateUploadStatus));
    }

    return Promise.all(promises)
      .then(async (results) => {
        console.log("Todas as promessas foram resolvidas:", results);
        return { rejected: false, message: "Todas as promessas foram resolvidas" };
      })
      .catch((errors) => {
        console.error("Pelo menos uma promessa foi rejeitada:", errors);

        return { rejected: true, message: errors };
      });
  }

  private async sendData(
    id: number,
    updateUploadStatus: (currState: Array<sendStatus>) => void,
    resolve: (value: unknown) => void,
    reject: (reason?: unknown) => void,
    socket: WebSocket,
  ) {
    this.files[id].ready_to_send = false;
    const file = await this.files[id].file;

    if (file) {
      const chunkSize = 128 * 1024;
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        if (event.target && event.target.result instanceof ArrayBuffer) {
          const fileData: ArrayBuffer = event.target.result;
          const totalChunks = Math.ceil(fileData.byteLength / chunkSize);

          for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
            if (socket.readyState > 2) {
              reject("Conexão fechada inesperadamente.");
              this.has_error = true;
              break;
            }
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, fileData.byteLength);
            const chunk = fileData.slice(start, end);
            socket.send(chunk);
            this.files[id].sent += 1;
            updateUploadStatus(this.files);
            await new Promise((resolve) => setTimeout(resolve, 100)); // Pequeno atraso para simular streaming
          }
          updateUploadStatus(this.files);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.log("Arquivo?");
    }
  }

  async operator(id: number, updateUploadStatus: (currState: Array<sendStatus>) => void) {
    return new Promise((resolve, reject) => {
      const { protocol, hostname, port } = window.location;
      const wsOrWss = protocol === "https:" ? "wss:" : "ws:";
      const url = `${wsOrWss}//${hostname}:${port}/api/${this.sector}/sendfile`;
      const socket = new WebSocket(url);   


      const intervalRef = setInterval(() => {
        console.log(
          !this.files[id].sending,
          socket.readyState == 1,
          this.files[id].ready_to_send,
        );
        if (
          !this.files[id].sending &&
          socket.readyState == 1 &&
          this.files[id].ready_to_send
        ) {
          socket.send("status:await-to-send");
          this.files[id].status = "Alto tráfego, aguarde.";
          updateUploadStatus(this.files);
        }
       
        
      }, 1500);


      setTimeout(()=>{
        if(socket.readyState != 1){
          this.has_error = true;
           socket.close();
          reject("Falha na conexao\n");
        }
      },8000);

      socket.addEventListener("open", (event) => {
        console.log("Conexão aberta: ", event);
        try {
          const file = this.files[id];
          if (file) {
            const json = {
              requirement: this.requirement,
              requirement_hash:this.hash,
              files: this.files.map((value) => {
                return { name: value.name, size: value.size };
              }),
              file_sent: id,
            };
            socket.send(JSON.stringify(json));
  
            this.files[id].ready_to_send = true;
            updateUploadStatus(this.files);
          } else {
            this.files[id].status = "Selecione um arquivo para enviar.";
          }
        } catch (error) {
          console.log(error);
        }
    
        
        
      });

      socket.addEventListener("message", async (event) => {
        //   this.files[id].status = `Mensagem recebsida: ${event.data}`;

        const msg = event.data.split(":");

        console.log(msg);

        switch (msg[0]) {
        case "status":
          console.log("status");
          switch (msg[1]) {
          case "stream-ready":
            this.files[id].sending = true;
            clearInterval(intervalRef);
  
            await this.sendData(
              id,
              updateUploadStatus,
              resolve,
              reject,
              socket,
            );
            break;
          case "invalid-data":
            this.files[id].status =
                  "Formato de envio do requerimento é inválido.";
            this.has_error=true;
            socket.close();
            clearInterval(intervalRef);
            reject("Formato de envio do requerimento é inválido.");
            break;
          case "all-files-sent":
            clearInterval(intervalRef);
            break;
          }
          break;
        case "message":
          //console.log(msg[1]);
          this.files[id].status = msg[1];
          updateUploadStatus(this.files);
          break;
        case "error":
          this.files[id].status = msg[1];
          this.files[id].error = 1;
          clearInterval(intervalRef);
          console.log(msg[1]);
          reject(msg[1]);
          updateUploadStatus(this.files);
          this.has_error = true;
          socket.close();
          break;
        case "upload":
        //  console.log(msg[1]);
          this.files[id].sent = Math.round(Number(msg[1]));

          if (this.files[id].sent == 100) {
            this.files[id].file_sent = true;
            this.sucess_upload_quantity += 1;
            this.files[id].status = "Arquivo enviado.";
            resolve(`Promise ${id} resolvida.`);
            clearInterval(intervalRef);
          }

          updateUploadStatus(this.files);
          break;
        }
      });

      socket.addEventListener("close", () => {
        console.log("Conexão fechada.");
        if (
          this.files[id].error != 1 &&
          !this.files[id].status.includes("enviado")
        ) {
          this.files[id].status = "Erro ao enviar.";
        }
        updateUploadStatus(this.files);
        //updateUploadStatus([]);
        //statusDiv.textContent = 'Conexão fechada.';
        clearInterval(intervalRef);

        if(this.has_error)
          reject("Erro ao enviar arquivo. Tente novamente mais tarde");
      });

      socket.addEventListener("error", () => {
        reject("Erro ao enviar arquivo. Tente novamente mais tarde.");
        clearInterval(intervalRef);
      });
    });
  }
}
