import { trigger,style,transition,animate,keyframes,query,stagger,state } from '@angular/animations';


export const todoAnimation = trigger('todoAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
    animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
      style({ transform: 'scale(1)', opacity: 1 }))  // final
  ]),
  transition(':leave', [
    style({ transform: 'scale(1)', opacity: 1, height: '*' }),
    animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
     style({ 
       transform: 'scale(0.5)', opacity: 0, 
       height: '0px', margin: '0px' 
     })) 
  ])
  
])

export const buttonState = trigger('buttonState', [
  state('normal', style({
  })),
  state('open', style({
    transform: 'scale(1.2)',
  })),
  transition('normal => open', animate('200ms ease-out')),
  transition('open => normal', animate('200ms ease-in'))
])

export const fromVoidAnimation = trigger('fromVoidAnimation', [
  transition(':enter', [
      animate('.4s ease-in', keyframes([
        style({opacity: 0, transform: 'translateY(-35%)', offset: 0}),
        style({opacity: .5, transform: 'translateY(10px)', offset: 0.2}),
        style({opacity: 1, transform: 'translateY(0)', offset: 1.0}),
      ]))]),
    transition(':leave', [
      animate('.3s ease-out', keyframes([
        style({opacity: 1, transform: 'translateY(0)', offset: 0}),
        style({opacity: .5, transform: 'translateY(10px)', offset: 0.2}),
        style({opacity: 0, transform: 'translateY(-35%)', offset: 1.0}),
      ]))]),
    ])





