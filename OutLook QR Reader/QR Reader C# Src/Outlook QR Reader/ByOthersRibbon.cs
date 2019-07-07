﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.Office.Tools.Ribbon;
using System.IO;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Diagnostics;
using ThoughtWorks.QRCode.Codec;
using ThoughtWorks.QRCode.Codec.Data;
using Gma.System.MouseKeyHook;
using Outlook = Microsoft.Office.Interop.Outlook;
using Office = Microsoft.Office.Core;
using Outlook_QR_Reader;

namespace Outlook_QR_Reader
{
    public partial class ByOthersRibbon
    {
        private void Ribbon1_Load(object sender, RibbonUIEventArgs e)
        {
            //Outlook.Application application = ByOthersRibbon.;
        }

        private void QRReader_BTN_Click(object sender, RibbonControlEventArgs e)
        {
            Subscribe();
        }
        private static Bitmap CaptureImage(int x, int y, int w, int h)
        //get a screen shot of a area, with width of w, height of h, centered with x and y 
        {
            Bitmap b = new Bitmap(w, h);
            using (Graphics g = Graphics.FromImage(b))
            {
                g.CopyFromScreen(x, y, 0, 0, new Size(w, h), CopyPixelOperation.SourceCopy);
            }
            return b;
        }
        public static string CodeDecoder(Bitmap examplecapture)
        {
            string decoderStr;
            try
            {
                Bitmap bitMap = examplecapture;//实例化位图对象，把文件实例化为带有颜色信息的位图对象  
                QRCodeDecoder decoder = new QRCodeDecoder();//实例化QRCodeDecoder  

                //通过.decoder方法把颜色信息转换成字符串信息  
                decoderStr = decoder.decode(new QRCodeBitmapImage(bitMap), System.Text.Encoding.UTF8);
                bitMap.Dispose();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return decoderStr;//返回字符串信息  
        }

        private IKeyboardMouseEvents m_GlobalHook;
        public void Subscribe()
        {
            // Note: for the application hook, use the Hook.AppEvents() instead
            m_GlobalHook = Hook.GlobalEvents();

            m_GlobalHook.MouseDownExt += GlobalHookMouseDownExt;
        }
        private void GlobalHookMouseDownExt(object sender, MouseEventExtArgs e)
        {
            //triggers QR Reader once hook applied
            Bitmap bmp = null;
            int width = 300;
            int height = 300;
            Outlook.ContactItem contact;
            Outlook.Application app = Globals.ThisAddIn.exampleGetApplication();
            try
            {
                bmp = CaptureImage(Cursor.Position.X - width / 2, Cursor.Position.Y - height / 2, width, height);
                string temppath__vcard = Path.GetTempPath();
                temppath__vcard += "tempvcard.vcf";
                File.WriteAllText(temppath__vcard, CodeDecoder(bmp));
                bmp.Dispose();
                Unsubscribe();
                //MessageBox.Show(temppath__vcard);
                contact = app.Session.OpenSharedItem(temppath__vcard);
                contact.Display();
            }
            catch (Exception ex)
            {
                //nothing happens here
            }
            Unsubscribe();
        }
        public void Unsubscribe()
        {
            m_GlobalHook.MouseDownExt -= GlobalHookMouseDownExt;
            //It is recommened to dispose it
            m_GlobalHook.Dispose();
        }

    }
}
