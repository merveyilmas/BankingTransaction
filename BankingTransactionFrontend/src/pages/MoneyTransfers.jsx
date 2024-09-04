import React, { useRef, useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';


export default function MenuItem1_2() {

  const toast = useRef(null);

  return (
    <div style={{ width: '100%', height: "100%" }} >
      <Toast ref={toast} />

      <Card>

        <h3 style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>Menu Item 1_2</h3>

      </Card>

    </div>
  )
}
