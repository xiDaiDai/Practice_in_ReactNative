package com.example;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class MyClass{
    /**
     * �ѽ���������ת��Ϊ���ֱ�ʾ��С������������뱣����λ 
     * ����һ�ַ���������ת���Ĺ����в���������0�������Ȼ������յĽ������һ�α����ϲ��������� 
     */
    public static String [] ChineseNum = new String[]{"��","Ҽ","��","��","��","��","½","��","��","��"};
    public static String NumToChinese(double num){
        if(num > 99999999999999.99 || num < -99999999999999.99)
            throw new IllegalArgumentException("����ֵ��������Χ (-99999999999999.99 �� 99999999999999.99)��");
        boolean negative = false;//�������  
        if(num<0){
            negative = true;
            num = num*(-1);
        }
        long temp = Math.round(num*100);
        int numFen=(int)(temp%10);//��  
        temp=temp/10;
        int numJiao = (int)(temp%10);//��  
        temp=temp/10;
        //��ʱtempֻ������������  
        int [] parts =new int[20];//������������ַ�Ϊ��0-9999֮�����ĸ�������  
        int numParts = 0;//��¼��ԭ������������ַָ�Ϊ��������   
        for(int i=0;;i++){
            if(temp == 0)
                break;
            int part = (int)(temp%10000);
            parts[i] =part;
            temp = temp/10000;
            numParts++;
        }
        boolean beforeWanIsZero = true;//��־λ����¼�����һ���Ƿ�Ϊ0  
        String chineseStr = "";
        for(int i=0;i<numParts;i++){
            String partChinese = partConvert(parts[i]);
            if(i%2==0){
                if("".equals(partChinese))
                    beforeWanIsZero = true;
                else
                    beforeWanIsZero = false;
            }
            if(i!=0){
                if(i%2==0)//�ڵĲ���  
                    chineseStr = "��"+chineseStr;
                else{
                    if("".equals(partChinese)&&!beforeWanIsZero)// ������򡱶�Ӧ�� part Ϊ 0������������һ����Ϊ 0���򲻼ӡ��򡱣����ӡ��㡱  
                        chineseStr = "��"+chineseStr;
                    else{
                        if(parts[i-1]<1000&&parts[i-1]>0)//�����Ĳ��ֲ�Ϊ0������ǰ��Ĳ���С��1000����0���������Ӧ�ø���  
                            chineseStr = "��"+chineseStr;
                        chineseStr = "��"+chineseStr;
                    }
                }
            }
            chineseStr = partChinese + chineseStr;
        }
        if("".equals(chineseStr))//��������Ϊ0�����ʾΪ��Ԫ  
            chineseStr = ChineseNum[0];
        else if(negative)//�������ֲ�λ0������Ϊ����  
            chineseStr = "��" +chineseStr;
        chineseStr = chineseStr + "Ԫ";
        if(numFen==0&&numJiao==0){
            chineseStr = chineseStr +"��";
        }
        else if(numFen==0){//0��  
            chineseStr = chineseStr +ChineseNum[numJiao] + "��";
        }
        else{
            if(numJiao==0)
                chineseStr = chineseStr + "��" + ChineseNum[numFen] + "��";
            else
                chineseStr = chineseStr + ChineseNum[numJiao] + "��" + ChineseNum[numFen] + "��";
        }
        return chineseStr;
    }
    //ת����ֺ��ÿ�����֣�0-9999֮��  
    public static String partConvert(int partNum){
        if(partNum<0||partNum>10000){
            throw new IllegalArgumentException("���������Ǵ��ڵ���0��С��10000������");
        }
        String [] units = new String[]{"","ʰ","��","Ǫ"};
        int temp = partNum;
        String partResult = new Integer(partNum).toString();
        int partResultLength = partResult.length();
        boolean lastIsZero = true;//��¼��һλ�Ƿ�Ϊ0  
        String chineseStr = "";
        for(int i=0;i<partResultLength;i++){
            if(temp == 0)//��λ������  
                break;
            int digit = temp%10;
            if(digit == 0){
                if(!lastIsZero)//���ǰһ�����ֲ���0���ڵ�ǰ���ִ�ǰ����  
                    chineseStr = "��"+chineseStr;
                lastIsZero = true;
            }
            else{
                chineseStr = ChineseNum[digit] + units[i] +chineseStr;
                lastIsZero = false;
            }
            temp =temp/10;
        }
        return chineseStr;
    }
    public static void main(String args []){
        double num = 0;
        System.out.println("������������,-1�˳�");
        try{
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            num = Double.parseDouble(br.readLine());
        }catch(IOException e){
            System.out.println(e.toString());
        }
        while(num!=-1){
            System.out.println(num+NumToChinese(num));
            try{
                BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
                num = Double.parseDouble(br.readLine());
            }catch(IOException e){
                System.out.println(e.toString());
            }
        }
        System.out.println("�������ԣ�");
        System.out.println("100120: " + NumToChinese(100120));
        System.out.println("25000000000005.999: " + NumToChinese(25000000000005.999));
        System.out.println("45689263.626: " + NumToChinese(45689263.626));
        System.out.println("0.69457: " + NumToChinese(0.69457));
        System.out.println("253.0: " + NumToChinese(253.0));
        System.out.println("0: " + NumToChinese(0));
    }
}  