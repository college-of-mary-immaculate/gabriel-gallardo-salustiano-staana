import styles from "./component.module.css";

export default function Main(root) {
  root.innerHTML = `

    <div class="${styles['receipt-body']}">
      <!-- Header -->
      <div class="${styles['label-container']}">
        <h2 class="${styles['label-h2']}">Voting Receipt</h2>
      </div> 

      <!-- Content -->
      <div class="${styles['your-vote-container']}">

        <div class="${styles.center}">
          <span class="${styles['vote-recorded']}">Vote Recorded</span>
          <div class="${styles['mt-sm']}">
            <small>Receipt No: VR-2025-0903398</small>
          </div>
        </div>

        <hr class="${styles.divider}" />

        <!-- Voter Info -->
        <div class="${styles['info-row']}">
          <span class="${styles['info-label']}">Voter:</span>
          <span class="${styles['info-value']}">Juan Cruz</span>
        </div>

        <div class="${styles['info-row']}">
          <span class="${styles['info-label']}">Location:</span>
          <span class="${styles['info-value']}">Poblacion, Pandi, Bulacan</span>
        </div>

        <div class="${styles['info-row']}">
          <span class="${styles['info-label']}">Date:</span>
          <span class="${styles['info-value']}">December 20, 2025</span>
        </div>

        <div class="${styles['info-row']}">
          <span class="${styles['info-label']}">Time:</span>
          <span class="${styles['info-value']}">11:24 AM</span>
        </div>

        <hr class="${styles.divider}" />

        <!-- Votes -->
        <div class="${styles['section-title']}">Your Votes</div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">President</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Maria Santos</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">Vice President</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Roberto Garcia</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">Senator</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Ana Reyes</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Carlos Mendoza</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Elena Cruz</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Fernando Lopez</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Gloria Ramos</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Henry Tan</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Isabel Villanueva</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Jose Rivera</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Karen Bautista</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Luis Fernandez</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Monica Santiago</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}"></span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Nelson Aquino</span>
        </div>

        <div class="${styles['vote-row']} ${styles['mt-md']}">
          <span class="${styles['vote-label']}">Governor</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Ricardo Morales</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">Vice Governor</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Sofia Castillo</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">Mayor</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Thomas Valdez</span>
        </div>

        <div class="${styles['vote-row']}">
          <span class="${styles['vote-label']}">Vice Mayor</span>
          <span class="${styles['vote-dots']}"></span>
          <span class="${styles['vote-value']}">Victoria Navarro</span>
        </div>

      </div>  
    </div>
  `;

   root.className = styles['main'];
}